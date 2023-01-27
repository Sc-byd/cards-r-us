//somewhere we need a route to a secure-url-getting endpoint on the server that looks like
//app.get('/s3url', (req, res) => {

//})

//this file contains all the code to connect to the s3 bucket and get a secure url. then we'll pass that secure url to front end so it can travel with image upload.
import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto, { randomBytes } from 'crypto';
import { promisify } from "util";
import { fileURLToPath } from 'url';

const randomBytes = promisify(crypto.randomBytes);

dotenv.configure()

const region = 'us-east-1';
const bucketName = 'codesmith-scoobydoo-card-images';
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
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}


//on the client side:

// define whatever the file is
//const file = ...

//1. first ask server to get the secure url

//const { url } = await fetch ('/s3url').then(res => res.json())
//console.log(url)

//2. then make a put request - send image and url to s3 bucket

//await fetch(url, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "multipart/form-data"
//   },
//   body: file
// })

// const imageUrl = url.split('?')[0] // everything before the ?
// console.log(imageUrl);

//3. then make a post request to server with whatever else we need to store. I *THINK* we'd tell the server to store the url and somehow associate that image with the user who made it / owns it (??) in the mongo db, so that the user could see the card in their gallery?

