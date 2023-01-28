import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback as GoogleVerifyCallback,
} from 'passport-google-oauth20';
import {
  Strategy as GitHubStrategy,
  Profile as GithubProfile,
} from 'passport-github2';
import passport from 'passport';
import UserModel from './models/UserModel';
import bcrypt from 'bcrypt';

export const initializeGithubStrategy = () => {
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
};

export const initializeGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        callbackURL: 'http://localhost:8080/oauth/google/callback',
      },
      function (
        accessToken: any,
        refreshToken: any,
        profile: GoogleProfile,
        done: GoogleVerifyCallback
      ) {
        const { id, displayName, photos, emails } = profile;

        const user = UserModel.findOne({ email: emails?.[0].value });
        if (!user) {
          const newUser = new UserModel({
            username: displayName,
            avatar: photos?.[0].value,
            name: displayName,
            email: emails?.[0].value,
            userId: id,
          });
          newUser.save();
          return done(null, newUser);
        }
        return done(null, user);
      }
    )
  );
};

export const initializeLocalStrategy = () => {
  passport.use(
    new LocalStrategy(async (username: string, password: string, done: any) => {
      const user = await UserModel.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }

      const verified = await bcrypt.compare(password, user.password);
      if (!verified) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }

      return done(null, user);
    })
  );
};

export const initializeUserSerialization = () => {
  // req.user => cookie
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // cookie => req.user
  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });
};
