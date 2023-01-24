import github from './github';
import User from '../../models/UserModel';
import { Request, Response, NextFunction } from 'express';

const oauthController = {
  providers: {
    github,
  },

  //checks if authorized . isAuthenticated() is something not documented in the Passportjs docs. 
  //Had to research in stack overflow , video tutorials
  ensureAuth: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  },

  //if logged in lets redirect folks who try to get to the login page to the dash board
  ensureGuest: (req: Request, res: Response, next: NextFunction) => {
   if (req.isAuthenticated()) {
      res.redirect('/cards')
    } else {
      return next()
    }
  },


  middleware: {
    getUser: (req: Request, res: Response, next: NextFunction) => {
      const { login, email, name, avatar_url } = res.locals.GHUser;
      User.findOne({ username: login }, (err: any, user: any) => {
        console.log('getUser (findOne): ', user);
        if (err)
          return next({
            log: `Error saving oauth user: ${err}`,
            status: 500,
            message: { err: 'An error occurred saving oauth user.' },
          });

        if (user === null) {
          User.create(
            { username: login, email, name, avatar: avatar_url },
            (err, user) => {
              console.log('getUser (create): ', user);
              if (err)
                return next({
                  log: `Error saving oauth user: ${err}`,
                  status: 500,
                  message: { err: 'An error occurred saving oauth user.' },
                });

              res.locals.user = { ...user, id: user._id };
              // console.log(res.locals.user);
              return next();
            }
          );
        } else {
          res.locals.user = { ...user, id: user._id };
          // console.log(res.locals.user);
          return next();
        }
      });
    },

    addUser: (req: Request, res: Response, next: NextFunction) => {
      const { login, email, name, avatar_url } = res.locals.GHUser;
      User.create(
        { username: login, email, name, avatar: avatar_url },
        (err, user) => {
          console.log('addUser: ', user);
          if (err)
            return next({
              log: `Error saving oauth user: ${err}`,
              status: 500,
              message: { err: 'An error occurred saving oauth user.' },
            });

          res.locals.user = { ...user, id: user._id };
          // console.log(res.locals.user);
          return next();
        }
      );
    },
  },
};

export default oauthController;
