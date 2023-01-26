import { Configuration, OpenAIApi } from 'openai';
import { Request, Response, NextFunction } from 'express';

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
};

export default openaiController;
