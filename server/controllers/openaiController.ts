import { Configuration, OpenAIApi } from 'openai';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import { Rekognition, aws } from 'aws-sdk';
import dotenv from 'dotenv';
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
    const user = await UserModel.findOne({
      id: req.user.userId,
    });

    if (!user) {
      throw new Error('error retrieving user while saving image');
    }

    // user.gallery = [...user.gallery, s3Url];

    const update = await UserModel.findOneAndUpdate(
      { id: req.user.userId },
      { gallery: user.gallery }
    );

    return next();
  },
};

export default openaiController;
