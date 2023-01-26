import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import dotenv from 'dotenv';
import connectToDB from './db';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import User from './models/UserModel';
// const GitHubStrategy = require('passport-github2').Strategy;
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
dotenv.config();

const PORT = 3000;
const app = express();

// Routers
import apiRouter from './routes/api';
import oauthRouter from './routes/oauth';
import oauthController from './controllers/oauth/oAuthController';
import authRouter from './routes/auth';

// import logoutRouter from './routes/logoutRouter';
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added this...does this make a difference?

//database call
connectToDB();
//if not authorized homepage login signup if not authenticated
//if authenticated, dont allow them to go to login or homepage
//stores in DB
// passport authentication
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

passport.serializeUser(function (user, done) {
  //need to find the id in user-->only need id
  done(null, user);
});

//turns cookie info into user object
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

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
      profile: any,
      done: any
    ) {
      console.log(profile._json, 'PROFILE ONLY');
      const newUser = {
        username: profile._json.login,
        userId: profile._json.id,
        //make a new object to store in DB
        //insert keys that match Usermodel, insert values that match profile values
      };

      console.log(newUser, 'NEW USER');
      console.log(typeof newUser.userId);
      try {
        let user = await User.findOne({
          username: profile._json.login,
        });

        console.log(user, 'current user from database!');
        if (user) {
          console.log('user found in database');
          done(null, user);
        } else {
          console.log('creating new user');
          User.create(newUser);
          return done(null, user);
        }
      } catch (err) {
        throw new Error('error in the GitHub Strategy Login');
      }
      done(null, profile);
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
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

app.get('/image/upload', oauthController.ensureAuth, (req, res) => {
  /* get url from s3 */
});

app.post('/image/generate', oauthController.ensureAuth, (req, res) => {
  /* return 4 urls of something */
});

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

//NEW ROUTE
//NEW ROUTE
//NEW ROUTE
//NEW ROUTE

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
