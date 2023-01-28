import dotenv from 'dotenv';
//this file contains all the code to connect to the s3 bucket and get a secure url. then we'll pass that secure url to front end so it can travel with image upload.
import aws from 'aws-sdk';
import crypto from 'crypto';

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//this is the bucket object:
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export async function generateUploadURL() {
  const rawBytes = await crypto.randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}
