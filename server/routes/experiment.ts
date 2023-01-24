import { Router, Response, Request } from 'express';
const router = Router();

// Create service client module using ES6 syntax.
import { S3Client } from '@aws-sdk/client-s3';
// Set the AWS Region.
const REGION = 'us-east-1';
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

// Import required AWS SDK clients and commands for Node.js.
import { GetObjectCommand } from '@aws-sdk/client-s3';

export const bucketParams = {
  Bucket: 'codesmith-cards-r-us',
  Key: 'scooby.jpeg',
};

router.get('/getscooby', async (req: Request, res: Response) => {
  try {
    // Sends request to get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    res.contentType(bucketParams.Key);
    res.status(200);

    //stream data from S3 bucket into byte array. would be better to stream/pipe it to client, this is wasting lots of memory...
    const arr = await data.Body!.transformToByteArray();
    res.write(arr);
  } catch (err) {
    console.log('Error', err);
  }
});

//add file to AWS bucket:
router.post(
  '/putimage', (req: Request, res: Response) => {
    //https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/putobjectcommand.html
    //How do we get the card as an image file to put in the bucket? Maybe...
    //Draw card in Canvas api?
    //const dataURL = canvas.toDataURL("image/png");
    //use fetch to download that
    //then post
  }
  
);

 

export default router;
