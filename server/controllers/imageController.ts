import { Request, Response, NextFunction } from 'express';
import { generateUploadURL } from '../routes/s3';

const imageController = {
  getUploadUrl: async (req: Request, res: Response, next: NextFunction) => {
    console.log('Retrieving upload URL from S3...');
    const url = await generateUploadURL();
    res.locals.imageUrl = url;
    return next();
  },
};

export default imageController;
