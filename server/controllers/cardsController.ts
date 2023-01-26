import UserModel from '../models/UserModel';
import CardModel, { CardData } from '../models/CardModel';
import { Request, Response, NextFunction } from 'express';

const cardsController = {
  getAllCards: async (req: Request, res: Response, next: NextFunction) => {
    const getCards = await CardModel.find({
      //not finding property passport when offline...may need to log in first for this to be functional 
      authorId: req.user.userId,
    });

    try {
      // if get cards is undefined
      // ? how do we handle situation with no cards?
      if (!getCards) {
        throw new Error('Error in getAllCards in cardsController');
      }
      // send all cards as a response
      res.status(200).json({
        getCards,
      });
    } catch (err) {
      return next(err);
    }
  },

  getOneCard: async (req: Request, res: Response, next: NextFunction) => {
    // find card where DBcard matches req.params.id
    const card = await CardModel.find({ id: req.params.id });

    try {
      if (!card) {
        throw new Error('Error in getOneCard in cardsController');
      }
      res.status(200).json({
        card,
      });
    } catch (err) {
      return next(err);
    }
  },
  updateCard: async (req: Request, res: Response, next: NextFunction) => {
    const card = await CardModel.find({ id: req.params.id });
    // what properties need to be updated
  },

  // may have coded this one wrong 
  deleteCard: async (
    req: Request,
    res: Response,
    next: NextFunction,
    err: Error
  ) => {
    await CardModel.deleteOne(
      { id: req.params.id },
      (req: Request, res: Response, next: NextFunction, err: Error) => {
        if (err) {
          return next(err);
        }
      }
    );
  },

  // async getCards(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // const { _id, gallery } = res.locals.user;

  //     // res.locals.cards = await Promise.all(
  //     //   gallery.map(async (cardId: string) => {
  //     //     const card = await CardModel.findOne({ _id: cardId });
  //     //     if (!card) {
  //     //       return null;
  //     //     }
  //     //     const { message, image, author } = card;
  //     //     return {
  //     //       message,
  //     //       cardId: card._id,
  //     //       author: _id === author,
  //     //       imageUrl: image,
  //     //     };
  //     //   })
  //     // );

  //     return next();
  //   } catch (e: any) {
  //     return next({
  //       log: 'Error getting cards in cardController',
  //       status: 500,
  //       message: { err: e.message },
  //     });
  //   }
  // },

  // getCard: (req: Request, res: Response, next: NextFunction) => {
  //   const { cardId } = req.params;

  //   if (!cardId)
  //     return next({
  //       log: 'Error getting card in cardController',
  //       status: 400,
  //       message: { err: 'No card ID specified.' },
  //     });

  //   CardModel.findOne({ _id: cardId }, (err: any, card: any) => {
  //     if (err)
  //       return next({
  //         log: `Error getting card in cardController: ${err}`,
  //         status: 400,
  //         message: { err: 'An error occured.' },
  //       });

  //     if (card === null)
  //       return next({
  //         log: 'Error getting card in cardController: No card found.',
  //         status: 404,
  //         message: { err: 'No card found.' },
  //       });

  //     const { message, image, _id, author, messageColor } = card;
  //     res.locals.card = {
  //       message,
  //       messageColor,
  //       cardId: _id,
  //       // TODO: this is temporarily hardcoded
  //       author: true,
  //       imageUrl: image,
  //     };
  //     return next();
  //   });
  // },

  // async createCard(req: Request, res: Response, next: NextFunction) {
  //   const { imageUrl, message, messageColor } = req.body;
  //   console.log(req.body);

  //   try {
  //     if (!imageUrl || !message || !messageColor)
  //       return new Error('No image url or message provided');
  //     const newCard = await CardModel.create({
  //       author: res.locals.user.id,
  //       image: imageUrl,
  //       message,
  //       messageColor,
  //     });

  //     const { _id } = newCard;
  //     res.locals.user.gallery.push(_id);
  //     await UserModel.findOneAndUpdate(
  //       { _id: res.locals.user._id },
  //       { gallery: res.locals.user.gallery }
  //     );
  //     return next();
  //   } catch (e: any) {
  //     return next({
  //       log: 'Error creating card in cardController',
  //       status: 409,
  //       message: { err: e.message },
  //     });
  //   }
  // },

  // async deleteCard(req: Request, res: Response, next: NextFunction) {
  //   // res.send('Deleting card...');
  //   //res.locals.user;
  //   const { id } = req.body;

  //   if (!id) {
  //     return next({
  //       log: 'Error deleting card in cardController',
  //       status: 401,
  //       message: { err: 'No card id provided.' },
  //     });
  //   }
  //   try {
  //     const newGallery = res.locals.user.gallery.filter(
  //       (strID: string) => strID !== id
  //     );

  //     await UserModel.findOneAndUpdate(
  //       { _id: res.locals.user._id },
  //       { gallery: newGallery }
  //     );

  //     res.locals.removedCardID = id;

  //     return next();
  //   } catch (e: any) {
  //     return next({
  //       log: 'Error deleting card in cardController',
  //       status: 500,
  //       message: { err: e.message },
  //     });
  //   }
  // },
};

export default cardsController;
