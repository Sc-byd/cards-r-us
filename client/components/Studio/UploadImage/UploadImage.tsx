import { Button, Input } from '@mui/joy';
import { S3 } from 'aws-sdk';
import React from 'react';
import { useNavigate } from 'react-router';
import useStudioData from '../../../hooks/useStudioData';
import GlowButton from '../../GlowButton/GlowButton';
import styles from './UploadImage.module.scss';

const UploadImage = () => {
  // define whatever the file is
  // const file;

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

  const [dragOver, setDragOver] = React.useState(false);
  const [rawImageUrl, setRawImageUrl] = React.useState<string>('');
  const [rawImageData, setRawImageData] = React.useState<File | null>(null);

  const { setStudioData } = useStudioData();
  const navigate = useNavigate();

  const imageUpload = async (file: File) => {
    if (!file.type.startsWith('image')) return;
    const reader = new FileReader();

    setRawImageData(file);

    reader.onload = (event) => {
      setRawImageUrl(event.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await imageUpload(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    await imageUpload(file);
  };

  const handleContinue = async () => {
    if (!rawImageData) return;

    console.log('Retrieving URL from server...');
    const urlResponse = await fetch('/api/image/url');

    if (!urlResponse.ok) {
      console.log('URL retrieval failed:', urlResponse);
      return;
    }

    const { url } = await urlResponse.json();

    console.log('URL retrieved:', url);

    try {
      console.log('Uploading image to S3...');
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': rawImageData.type,
        },
        body: rawImageData,
      });

      if (!uploadResponse.ok) {
        console.log('Upload failed:', uploadResponse);
        return;
      }

      const imageUrl = url.split('?')[0];
      setStudioData((studioData) => {
        const newStudioData = structuredClone(studioData);
        newStudioData.cardData.image.src = imageUrl;
        newStudioData.cardData.image.alt = rawImageData.name.split('.')[0];
        return newStudioData;
      });

      navigate('/cards/create/embellish');
    } catch (error) {
      console.log('Upload failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.drag}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #FFF' : '2px dashed #ccc',
          filter: dragOver ? 'drop-shadow(0px 0px 9px #b4ffffd0)' : 'none',
        }}>
        <p
          style={{
            color: dragOver ? '#FFF' : '#ccc',
            textShadow: dragOver ? '0px 0px 9px #b4ffffd0' : 'none',
          }}>
          Drag and drop image here or browse below
        </p>
        {rawImageUrl && (
          <img className={styles.image} src={rawImageUrl} alt='' />
        )}
      </div>
      <div className={styles.browse}>
        <input
          accept='image/*'
          // className={classes.input}
          style={{ display: 'none' }}
          id='raised-button-file'
          multiple
          type='file'
          onChange={handleUpload}
        />
        <label htmlFor='raised-button-file'>
          <Button variant='outlined' component='span'>
            Upload Image File
          </Button>
        </label>
      </div>
      <GlowButton disabled={!rawImageData} onClick={handleContinue}>
        Continue
      </GlowButton>
    </div>
  );
};

export default UploadImage;
