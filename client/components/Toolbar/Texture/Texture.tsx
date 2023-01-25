import { Option, Select, Slider } from '@mui/joy';
import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import { Texture, TEXTURES } from '../../Card/Card';

const TEXTURE_OPTIONS = Object.keys(TEXTURES).map((texture) => {
  const formattedTexture = texture.slice(0, 1).toUpperCase() + texture.slice(1);
  return { texture: formattedTexture, value: texture };
});

const Texture = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div id='texture'>
      <h3>Texture</h3>
      <div>
        <h4>Pattern</h4>
        <Select
          value={studioData.cardData.texture.pattern}
          onChange={(_, value) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              if (!Object.keys(TEXTURES).includes(value as string) || !value) {
                newStudioData.cardData.texture.pattern = 'none';
                return newStudioData;
              }
              newStudioData.cardData.texture.pattern = value as Texture;
              return newStudioData;
            });
          }}>
          {TEXTURE_OPTIONS.map((texture) => (
            <Option key={texture.value} value={texture.value}>
              {texture.texture}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <h4>Intensity</h4>
        <Slider
          aria-label='Volume'
          value={studioData.cardData.texture.intensity}
          onChange={(_, newValue) => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardData.texture.intensity = newValue as number;
              return newStudioData;
            });
          }}
        />
      </div>
    </div>
  );
};

export default Texture;
