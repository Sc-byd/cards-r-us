import React from 'react';
import { useNavigate } from 'react-router';
import { Form } from 'react-router-dom';
import useStudioData from '../../../hooks/useStudioData';

const NO_PROMPT = 'Scooby doo and friends beach vacation';

const GenerateImage = () => {
  const navigate = useNavigate();
  const { setStudioData } = useStudioData();
  const [prompt, setPrompt] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div>
      <Form onSubmit={handleSubmit}>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button type='submit'>Make me a picture</button>
      </Form>
    </div>
  );
};

export default GenerateImage;
