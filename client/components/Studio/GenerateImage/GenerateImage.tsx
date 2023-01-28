import { Textarea } from '@mui/joy';
import React from 'react';
import { useNavigate } from 'react-router';
import { Form } from 'react-router-dom';
import useStudioData from '../../../hooks/useStudioData';
import GlowButton from '../../GlowButton/GlowButton';
import styles from './generateImage.module.scss';

const NO_PROMPT = 'Scooby doo and friends beach vacation';

const GenerateImage = () => {
  const navigate = useNavigate();
  const { setStudioData } = useStudioData();
  const [prompt, setPrompt] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) {
      setPrompt(NO_PROMPT);
      return;
    }

    setStudioData((studioData) => {
      return {
        ...studioData,
        imagePrompt: prompt,
      };
    });

    navigate('/cards/create/select-image');
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} className={styles.container}>
        <Textarea
          color='info'
          minRows={2}
          placeholder='Enter an interesting prompt here to generate an image'
          size='lg'
          variant='outlined'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{
            width: 'min(90vw, 500px)',
            height: '350px',
            fontSize: '1.25rem',
          }}
        />
        <GlowButton type='submit'>Make me a picture</GlowButton>
      </Form>
    </div>
  );
};

export default GenerateImage;
