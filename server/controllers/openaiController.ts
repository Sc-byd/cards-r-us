import { Configuration, OpenAIApi } from 'openai';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
// import { Rekognition, aws } from 'aws-sdk';
import dotenv from 'dotenv';
import CardModel from '../models/CardModel';
dotenv.config();
//import aws from aws-sdk

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiController = {
  async createImage(req: Request, res: Response, next: NextFunction) {
    // temporary code to avoid extra calls to openai
    res.locals.image = {
      data: [
        { url: 'https://source.unsplash.com/random/' },
        { url: 'https://source.unsplash.com/random/' },
        { url: 'https://source.unsplash.com/random/' },
        { url: 'https://source.unsplash.com/random/' },
      ],
    };

    return next();

    const { userPrompt } = req.body;
    console.log('Generating image from prompt: ', userPrompt);
    try {
      let timer = 0;
      const waitTimer = setInterval(() => {
        console.log(`Waiting for response: ${timer++} seconds elapsed`);
      }, 1000);

      const response = await openai.createImage({
        prompt: userPrompt,
        n: 4,
        size: '1024x1024',
      });
      clearInterval(waitTimer);
      console.log('Finished image generation: ', response.data);
      res.locals.image = response.data;
      return next();
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        return next({
          log: "Express Error handler caught middleware error at '/backend/controller/openaiController",
          message: { err: error.message },
        });
      }
    }
    console.log('complete');
    return next();
  },

  convertImage: async (req: Request, res: Response, next: NextFunction) => {
    // const region = 'us-east-' ;
    // const bucketName = 'openai-bucket-upload';
    // const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    // const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    // const s3 = new aws.S3({
    //   region, accessKeyId, secretAccessKey, signatureVersion: 4
    // })
  },

  saveImage: async (req: Request, res: Response, next: NextFunction) => {
    //passed in image url
    const url = req.params.url;
    //convert images to s3

    //const s3Url =
    let {
      id,
      image,
      backgroundColor,
      banner,
      texture,
      text,
      authorId,
      ownerId,
      createdAt,
    } = req.body;

    // set image to s3Url
    // image = s3Url
    authorId = req.session.passport.user.userId;
    try {
      await CardModel.create({
        id,
        image,
        backgroundColor,
        banner,
        texture,
        text,
        authorId,
        ownerId,
        createdAt,
      });
    } catch (err) {
      return next({
        log: 'Error saving card in openaiController',
        status: 500,
        message: { err },
      });
    }
    return next();
  },
};

export default openaiController;
