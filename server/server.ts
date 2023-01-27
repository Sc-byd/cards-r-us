import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import dotenv from 'dotenv';
import connectToDB from './db';
import UserModel, { User } from './models/UserModel';
import MongoStore from 'connect-mongo';
// const GitHubStrategy = require('passport-github2').Strategy;

import bcrypt from 'bcrypt';
import passport from 'passport';
import session from 'express-session';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Profile as GithubProfile,
  Strategy as GitHubStrategy,
} from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const PORT = 3000;
const app = express();

// Routers
import apiRouter from './routes/api';
import oauthRouter from './routes/oauth';
import oauthController from './controllers/oauth/oAuthController';
import { keyframes } from '@emotion/react';
import openaiController from './controllers/openaiController';

// import logoutRouter from './routes/logoutRouter';
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added this...does this make a difference?

//database call
connectToDB();
app.use(
  session({
    secret: 'cardSession',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI || '' }),
    // need to update models appropriately
  })
);
//user does Oauth thing get authenticated by github
//callback function inside of passportUse
//
app.use(passport.initialize());
app.use(passport.session());
// req.user => cookie
passport.serializeUser(function (user, done) {
  //need to find the id in user-->only need id
  done(null, user);
});

// cookie => req.user
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      // scope: ['user:email'],
      callbackURL: 'http://localhost:8080/oauth/github/callback',
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: GithubProfile,
      done: any
    ) {
      const { id, username, displayName, photos, emails } = profile;

      try {
        let user = await UserModel.findOne({
          email: emails?.[0].value,
        });

        if (!user) {
          const newUser = new UserModel({
            username: username,
            avatar: photos?.[0].value,
            name: displayName,
            email: emails?.[0].value,
            userId: id,
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      callbackURL: 'http://localhost:8080/oauth/google/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log('Google Strategy');
      done(null, profile);
    }
  )
);

//static server dist folder

app.use('/', express.static(path.resolve('./dist')));

// Main page
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

app.use('/cards', oauthController.ensureAuth, (req, res) => {
  console.log(req.user, 'req user in cards route');
  console.log(req.session, ' req session in cards route ');
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

app.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.status(200).json(req.user);
});

app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

app.get('/image/upload', oauthController.ensureAuth, (req, res) => {
  /* get url from s3 */
});

app.post(
  '/image/generate',
  oauthController.ensureAuth,
  openaiController.createImage,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.image);
  }
);

app.use('/login', oauthController.ensureGuest, (req, res) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});
app.use('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
// app.use('/google', googleRouter);
// 404 redirect to index.html for react router
app.use((req: Request, res: Response) =>
  res.status(200).sendFile(path.resolve('./dist/index.html'))
);

export interface ExpressError {
  log: string;
  status: number;
  message: { err: string };
}

// Express error handler
app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: ExpressError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    console.log('ERROR OBJECT', err);
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
