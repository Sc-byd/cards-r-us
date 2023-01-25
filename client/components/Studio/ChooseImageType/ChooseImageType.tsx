import React from 'react';
import { useNavigate } from 'react-router';

const ChooseImageType = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/cards/create/generate-image')}>
        Generate Image with AI
      </button>
      <button onClick={() => navigate('/cards/create/upload-image')}>
        Upload Custom Image
      </button>
    </div>
  );
};

export default ChooseImageType;
