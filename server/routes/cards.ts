import { Router, Request, Response } from 'express';
import cardsController from '../controllers/cardsController';
import sessionController from '../controllers/sessionController';
import oauthController from '../controllers/oauth/oAuthController';
// this logged using localhost:3000/cards
// router.get('/', (req, res) => {
//   console.log('cards router connected');
// });
const router = Router();

//GET REQUEST
router.get(
  '/',
  oauthController.ensureAuth,
  // sessionController.isLoggedIn,
  cardsController.getAllCards,
  (req: Request, res: Response) => {
    // console.log('hello alex');
    // console.log(req.user, 'req.user');
    //respond to client with cards collection data retrieved from DB
    console.log('GET REQUEST for cardsController.getCards');
    return res.status(200).json(res.locals.cards);
  }
);

router.get(
  '/card/:cardId',
  oauthController.ensureAuth,
  cardsController.getOneCard,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.card);
  }
);

// CREATE
router.post(
  '/',
  oauthController.ensureAuth,
  // sessionController.isLoggedIn,
  // cardsController.createCard,
  (req: Request, res: Response) => {
    console.log('CREATE REQUEST for cardsController.createCard');
    return res.status(200).json(res.locals.cards);
  }
);

// DELETE
router.delete(
  '/',
  sessionController.isLoggedIn,
  cardsController.deleteCard,
  (req: Request, res: Response) => {
    console.log('DELETE REQUEST for cardsController.deleteCard');
    return res.status(200).json(res.locals.cards);
  }
);

export default router;
