import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import connectToDB from './db';
require('dotenv').config();
// const GitHubStrategy = require('passport-github2').Strategy;

import session from 'express-session';
import passport from 'passport';

const PORT = 3000;
const app = express();

// Routers
import oauthController from './controllers/oauth/oAuthController';
import openaiController from './controllers/openaiController';
import {
  initializeGithubStrategy,
  initializeGoogleStrategy,
  initializeLocalStrategy,
  initializeUserSerialization,
} from './passport';
import apiRouter from './routes/api';
import cardsRouter from './routes/cards';
import oauthRouter from './routes/oauth';
import imageRouter from './routes/imageRouter';

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

initializeLocalStrategy();
initializeGithubStrategy();
initializeGoogleStrategy();

initializeUserSerialization();

//static server dist folder

app.use('/', express.static(path.resolve('./dist')));

app.use('/oauth', oauthRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/image', imageRouter);
app.use('/api', apiRouter);

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
