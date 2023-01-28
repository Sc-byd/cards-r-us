import express from 'express';
import imageController from '../controllers/imageController';
import oauthController from '../controllers/oauth/oAuthController';

const imageRouter = express.Router();

imageRouter.get(
  '/url',
  oauthController.ensureAuth,
  imageController.getUploadUrl,
  (req, res) => {
    res.status(200).json({ url: res.locals.imageUrl });
  }
);

export default imageRouter;
