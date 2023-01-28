import { Textarea } from '@mui/joy';
import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import ColorPicker from '../ColorPicker/ColorPicker';
import styles from './Back.module.scss';

const Back = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='back' className={styles.layout}>
      <h3>Back</h3>
      <div className={styles.background}>
        <h4>Background Color</h4>
        <ColorPicker
          color={studioData.cardData.backgroundColor}
          onColorChange={(color) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.backgroundColor = color;
              return newStudioData;
            });
          }}
        />
      </div>
      <div className={styles.content}>
        <h4>Text Content</h4>
        <Textarea
          id='back-text-content'
          value={studioData.cardData.text.back.value}
          onChange={(e) => {
            if (e.target.value.length > 300) {
              return;
            }
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.back.value = e.target.value;
              return newStudioData;
            });
          }}
          sx={{
            height: '8rem',
          }}
        />
      </div>
      <div className={styles.color}>
        <h4>Text Color</h4>
        <ColorPicker
          color={studioData.cardData.text.back.color}
          onColorChange={(color) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.back.color = color;
              return newStudioData;
            });
          }}
        />
      </div>
    </div>
  );
};

export default Back;
