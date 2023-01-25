import React from 'react';
import { useNavigate } from 'react-router';
import useStudioData from '../../../hooks/useStudioData';

const SelectImage = () => {
  const { studioData, setStudioData } = useStudioData();
  const navigate = useNavigate();
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/generate/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: studioData.imagePrompt,
        }),
      });
      const data = await response.json();
      console.log('Image data from OpenAI: ', data);
      // TODO: Add images to state
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
    <div>
      <h2>Pick your favorite image</h2>
      {images.map((image) => (
        <div onClick={() => handleSelectImage(image)}>
          <img src={image} alt={studioData.imagePrompt} />
        </div>
      ))}
    </div>
  );
};

export default SelectImage;
