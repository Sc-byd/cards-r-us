import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
const router = Router();

// Github oauth provider route
// import gitHubRouter from './github';
// import googleRouter from './googleRouter';
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

router.get('/google', ( req: Request, res: Response) => {
  res.send('<h1>This is now received</h1>');
})
// NOT SURE IF NEEDED
// router.get('/github/failure', (req, res) => {
//   res.send('Failure');
// });

export default router;
