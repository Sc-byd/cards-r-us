import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import TempColorPicker from '../TempColorPicker';
import styles from './FrontText.module.scss';

const FrontText = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='text' className={styles.layout}>
      <h3>Text</h3>
      <div>
        <label htmlFor='front-text-content'>Content</label>
        <textarea
          id='front-text-content'
          value={studioData.cardData.text.front.value}
          onChange={(e) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.value = e.target.value;
              return newStudioData;
            });
          }}
        />
      </div>
      <div>
        <h4>Position</h4>
        <button
          onClick={() =>
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.position = 'top';
              return newStudioData;
            })
          }>
          Top
        </button>
        <button
          onClick={() =>
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.position = 'middle';
              return newStudioData;
            })
          }>
          Middle
        </button>
        <button
          onClick={() =>
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.position = 'bottom';
              return newStudioData;
            })
          }>
          Bottom
        </button>
      </div>
      <div>
        <h4>Color</h4>
        <TempColorPicker
          onColorChange={(color) =>
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.text.front.color = color;
              return newStudioData;
            })
          }
        />
      </div>
    </div>
  );
};

export default FrontText;
