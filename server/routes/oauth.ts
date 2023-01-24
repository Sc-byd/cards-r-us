import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    //check mongo store to see if user is stored and if so...give them access, or else EJECT
    // HOW TO AUTHORIZE IN PASSPORT ! ...and in general
    // console.log('RES LOG IN CALLBACK URL', res);
    res.redirect('/cards');
  }
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    res.redirect('/cards');
  }
);
export default router;
