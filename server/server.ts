import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import dotenv from 'dotenv';
//import { generateUploadURL } from './s3.js';

import connectToDB from './db';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import oauthRouter from './routes/oauth/oauth';
// const GitHubStrategy = require('passport-github2').Strategy;
import { Strategy as GitHubStrategy } from 'passport-github2';

dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const PORT = 3000;
const app = express();

// api router
import apiRouter from './routes/api';
import { keyframes } from '@emotion/react';
import { OneK } from '@mui/icons-material';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added this...does this make a difference?

//database call
connectToDB();

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

//from Sam Meech-Ward tutorial
// app.get('/s3Url', async (req, res) => {
//   const url = await s3.generateUploadURL();
//   res.send({url})
// })

//static server dist folder
// Main page
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
        callbackURL: 'http://localhost:8080/oauth/github/callback',
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        const newUser = {
          //make a new object to store in DB
          //insert keys that match Usermodel, insert values that match profile values
        };

        try {
          let user; // await User.findOne({userId: profile.id}) ;
          if (user) {
            done(null, user);
          } else {
            //user = User.create(newUser)
            //done(null, user)
          }
        } catch (err) {
          throw new Error('error in the GitHub Strategy Login');
        }
        done(null, profile);
      }
    )
  );
});

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

//if not authorized homepage login signup if not authenticated
//if authenticated, dont allow them to go to login or homepage

//stores in DB
passport.serializeUser(function (user, done) {
  //need to find the id in user-->only need id
  done(null, user);
});

//turns cookie info into user object
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

//static server dist folder
// Main page
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve());
});

app.use(express.static(path.resolve('dist')));

// All api routes
app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

// app.use('/google', googleRouter);
// 404 redirect to index.html for react router
app.use('*', (req: Request, res: Response) =>
  res.status(200).sendFile(path.resolve('dist/index.html'))
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
