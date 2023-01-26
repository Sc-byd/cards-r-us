import React from 'react';
import { useNavigate } from 'react-router';
import useStudioData from '../../../hooks/useStudioData';
import styles from './SelectImage.module.scss';

const SelectImage = () => {
  const { studioData, setStudioData } = useStudioData();
  const navigate = useNavigate();
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!studioData.imagePrompt) {
      // navigate('/cards/create/generate-image');
      // return;
    }
    const fetchImages = async () => {
      console.log('Fetching images from OpenAI...');
      const response = await fetch('/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: studioData.imagePrompt,
        }),
      });
      const { data } = await response.json();
      console.log('Image data from OpenAI: ', data);
      setImages(data.map((imageData: { url: string }) => imageData.url));
    };
    fetchImages();
  }, []);

  const handleSelectImage = (src: string) => {
    setStudioData((studioData) => {
      const newStudioData = structuredClone(studioData);
      newStudioData.cardData.image.src = src;
      newStudioData.cardData.image.alt = studioData.imagePrompt || '';
      return newStudioData;
    });
    navigate('/cards/create/embellish');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.glowtext}>Pick your favorite image</h2>
      <div className={styles.layout}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageContainer}
            onClick={() => handleSelectImage(image)}>
            <img src={image} alt={studioData.imagePrompt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectImage;
