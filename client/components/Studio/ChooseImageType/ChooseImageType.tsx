import React from 'react';
import { useNavigate } from 'react-router';
import GlowButton from '../../GlowButton/GlowButton';
import styles from './ChooseImageType.module.scss';

const ChooseImageType = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <GlowButton onClick={() => navigate('/cards/create/generate-image')}>
        Generate Image with AI
      </GlowButton>
      <GlowButton onClick={() => navigate('/cards/create/upload-image')}>
        Upload Custom Image
      </GlowButton>
    </div>
  );
};

export default ChooseImageType;
