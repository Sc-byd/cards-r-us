import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import ColorPicker from '../ColorPicker/ColorPicker';
import TempColorPicker from '../TempColorPicker';
import styles from './frontBanner.module.scss';

const FrontBanner = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='banner' className={styles.layout}>
      <h3>Banner</h3>
      <div className={styles.enabled}>
        <h4>Enable</h4>
        <input
          type='checkbox'
          checked={studioData.cardData.banner.enabled}
          onChange={(e) =>
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.banner.enabled = e.target.checked;
              return newStudioData;
            })
          }
        />
      </div>
      <div className={styles.color}>
        <h4>Color</h4>
        <ColorPicker
          color={studioData.cardData.banner.color}
          onColorChange={(color) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.banner.color = color;
              return newStudioData;
            });
          }}
        />
      </div>
    </div>
  );
};

export default FrontBanner;
