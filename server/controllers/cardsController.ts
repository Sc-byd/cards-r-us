import { User } from '../models/UserModel';
import CardModel from '../models/CardModel';
import { Request, Response, NextFunction } from 'express';

const cardsController = {
  createCard: async (req: Request, res: Response, next: NextFunction) => {
    const { cardData, recipientEmail } = req.body;

    if (!cardData || !recipientEmail) {
      return next({
        log: 'Middleware error caught in cardsController - createCard failed',
        status: 500,
        message: { err: 'No card data or recipient email provided.' },
      });
    }

    if (!req.user) {
      return next({
        log: 'Middleware error caught in cardsController - createCard failed',
        status: 500,
        message: { err: 'No user found in req.user' },
      });
    }

    try {
      const card = await CardModel.create(cardData);

      // TODO: Upload card to S3

      card.authorId = (req.user as User).userId;
      card.ownerId = recipientEmail;
      card.createdAt = new Date();

      await card.save();

      res.locals.card = card;
      return next();
    } catch (error) {
      return next({
        log: 'Middleware error caught in cardsController - createCard failed',
        status: 500,
        message: { err: error },
      });
    }
  },

  getAllCards: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next({
        log: 'Middleware error caught in cardsController - getAllCards failed',
        status: 500,
        message: { err: 'No user found in req.user' },
      });
    }

    const userId = (req.user as User).userId;

    try {
      const cards = await CardModel.find({
        $or: [{ authorId: userId }, { ownerId: userId }],
      });

      res.locals.cards = cards;
      return next();
    } catch (err) {
      return next({
        log: 'Middleware error caught in cardsController - getAllCards failed',
        status: 500,
        message: { err },
      });
    }
  },

  getOneCard: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next({
        log: 'Middleware error caught in cardsController - getOneCard failed',
        status: 500,
        message: { err: 'No user found in req.user' },
      });
    }

    const userId = (req.user as User).userId;
    const { cardId } = req.params;

    if (!cardId) {
      return next({
        log: 'Middleware error caught in cardsController - getOneCard failed',
        status: 500,
        message: { err: 'No cardId provided' },
      });
    }

    try {
      const card = await CardModel.findOne({ _id: cardId });

      if (!card) {
        return next({
          log: 'Middleware error caught in cardsController - getOneCard failed',
          status: 404,
          message: { err: 'No card found' },
        });
      }

      if (card.authorId !== userId && card.ownerId !== userId) {
        return next({
          log: 'Middleware error caught in cardsController - getOneCard failed',
          status: 401,
          message: { err: 'Unauthorized' },
        });
      }

      res.locals.card = card;
      return next();
    } catch (err) {
      return next(err);
    }
  },

  deleteCard: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next({
        log: 'Middleware error caught in cardsController - deleteCard failed',
        status: 500,
        message: { err: 'No user found in req.user' },
      });
    }

    const userId = (req.user as User).userId;
    const cardId = req.params.id;

    try {
      const card = await CardModel.findOne({ _id: cardId });
      if (!card) {
        return next({
          log: 'Middleware error caught in cardsController - deleteCard failed',
          status: 404,
          message: { err: 'No card found' },
        });
      }

      const received = !card.ownerId.includes('@');

      if (
        (received && card.ownerId === userId) ||
        (!received && card.authorId === userId)
      ) {
        await card.delete();
        res.locals.card = card;
        return next();
      }

      return next({
        log: 'Middleware error caught in cardsController - deleteCard failed',
        status: 401,
        message: { err: 'Unauthorized' },
      });
    } catch (err) {
      return next({
        log: 'Error deleting card in cardController',
        status: 500,
        message: { err },
      });
    }
    return next();
  },
};

export default cardsController;
