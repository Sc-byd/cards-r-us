import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
const authController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // if No Username or password
      if (!email || !password) {
        throw new Error('No username or password provided.');
      }
      // if user has already been created, throw an error
      if (await UserModel.findOne({ email })) {
        throw new Error('user already registered');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        email,
        password: hashedPassword,
      });

      //if any other error
      if (!newUser) {
        throw new Error('error while creating new user');
      }

      //user created, proceed to next middleware
      return next();
    } catch (e: any) {
      return next({
        log: 'Middleware error caught in authController - signUp failed',
        status: 500,
        message: { err: e.message },
      });
    }
  },

  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        throw new Error('No email or password provided.');

      const userAccount = await UserModel.findOne({ email });

      // check if user exists in database
      if (!userAccount) {
        throw new Error('User account does not exist');
      }

      // Get hashed password from database and compare it to password inputted
      const hashedPassword = userAccount.password;

      bcrypt.compare(password, hashedPassword, function (err, result) {
        // result == true
        if (!result) {
          throw new Error(
            'Our records do not match an email and password with those credentials'
          );
        }
        //after verification, pass user information to the next middleware
        const user = {
          email: userAccount.email,
          id: userAccount.userId,
          avatar: userAccount.avatar,
        };
        res.locals.user = user;
        return next();
      });
    } catch (err) {
      return next({
        log: `Error verifying user: ${err}`,
        status: 500,
      });
    }
  },
};

export default authController;
