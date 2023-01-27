import { Router, Request, Response } from 'express';
import cardsController from '../controllers/cardsController';
import sessionController from '../controllers/sessionController';
import oauthController from '../controllers/oauth/oAuthController';

const cardsRouter = Router();

//GET REQUEST
cardsRouter.get(
  '/',
  oauthController.ensureAuth,
  cardsController.getAllCards,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.cards);
  }
);

cardsRouter.get(
  '/:cardId',
  oauthController.ensureAuth,
  cardsController.getOneCard,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.card);
  }
);

// CREATE
cardsRouter.post(
  '/',
  oauthController.ensureAuth,
  cardsController.createCard,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.card);
  }
);

// DELETE
cardsRouter.delete(
  '/',
  oauthController.ensureAuth,
  cardsController.deleteCard,
  (req: Request, res: Response) => {
    console.log('DELETE REQUEST for cardsController.deleteCard');
    return res.status(200).json(res.locals.card);
  }
);

export default cardsRouter;
