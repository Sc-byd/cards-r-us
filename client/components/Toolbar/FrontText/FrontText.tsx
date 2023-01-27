import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import TempColorPicker from '../TempColorPicker';
import styles from './FrontText.module.scss';
import { SketchPicker } from 'react-color';
import { IconButton, Textarea } from '@mui/joy';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import ColorPicker from '../ColorPicker/ColorPicker';

const FrontText = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='text' className={styles.layout}>
      <h3>Text</h3>
      <div className={styles.content}>
        <h4>Content</h4>
        <Textarea
          id='front-text-content'
          value={studioData.cardData.text.front.value}
          onChange={(e) => {
            if (e.target.value.length > 21) {
              return;
            }
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.value = e.target.value;
              return newStudioData;
            });
          }}
          sx={{
            height: '3rem',
          }}
        />
      </div>
      <div className={styles.position}>
        <h4>Position</h4>
        <div className={styles.icons}>
          <IconButton
            onClick={() =>
              setStudioData((studioData) => {
                const newStudioData = structuredClone(studioData);
                newStudioData.cardData.text.front.position = 'top';
                return newStudioData;
              })
            }>
            <VerticalAlignTopIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              setStudioData((studioData) => {
                const newStudioData = structuredClone(studioData);
                newStudioData.cardData.text.front.position = 'middle';
                return newStudioData;
              })
            }>
            <VerticalAlignCenterIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              setStudioData((studioData) => {
                const newStudioData = structuredClone(studioData);
                newStudioData.cardData.text.front.position = 'bottom';
                return newStudioData;
              })
            }>
            <VerticalAlignBottomIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.color}>
        <h4>Color</h4>
        <ColorPicker
          color={studioData.cardData.text.front.color}
          onColorChange={(color) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.color = color;
              return newStudioData;
            });
          }}
        />
      </div>
      
    </div>
  );
};

export default FrontText;
