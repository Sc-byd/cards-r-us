import { Router, Request, Response } from 'express';
// import authController from '../controllers/authController';
import oauthController from '../controllers/oauth/oAuthController';
import sessionController from '../controllers/sessionController';
import { User } from '../models/UserModel';

const router = Router();
//POST when user tries to log in
//hash password before it's saved to database
router.post(
  '/login',
  // authController.verifyUser,
  oauthController.ensureGuest,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

// '/signup' Endpoint
router.post(
  '/signup',
  // authController.signUp,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

router.get(
  '/user',
  sessionController.isLoggedIn,
  (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { email, username, avatar, name, userId } = req.user as User;
    res.status(200).json({ email, username, avatar, name, userId });
  }
);

export default router;
