import { Router } from 'express';
// const router = express.Router(); //common js
//es6
// LoginRouter
import authRouter from './auth';
//cardsRouter
import cardsRouter from './cards';
// oauth router
import oauthRouter from './oauth';
// Ai generation router
import aiGeneration from './generation/generation';

import oauthController from '../controllers/oauth/oAuthController';

const router = Router();


router.get('/cards', oauthController.ensureAuth, (req, res) => {
  /* get cards from database */
});
router.post('/cards', oauthController.ensureAuth, (req, res) => {
  /* post to cards database  */
});
router.get('/cards/:id', oauthController.ensureAuth, (req, res) => {
  /* get one card by the cardId*/
});

// // auth route
// router.use('/auth', authRouter);

// //cardsRoute
// router.use('/cards', cardsRouter);

// //createRoute
// router.use('/generate', aiGeneration);

// oauth
router.use('/oauth', oauthRouter);

export default router;
