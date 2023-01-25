import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import TempColorPicker from '../TempColorPicker';

const FrontBanner = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='banner'>
      <h3>Banner</h3>
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
      <div>
        <h4>Color</h4>
        <TempColorPicker
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
