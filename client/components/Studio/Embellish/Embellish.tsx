import React from 'react';
import { useNavigate } from 'react-router';
import useStudioData from '../../../hooks/useStudioData';
import Card from '../../Card/Card';
import GlowButton from '../../GlowButton/GlowButton';
import ReverseButton from '../../ReverseButton/ReverseButton';
import Toolbar from '../../Toolbar/Toolbar';
import styles from './Embellish.module.scss';

const Embellish = () => {
  const { studioData, setStudioData } = useStudioData();
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <div className={styles.flip}>
        <Card
          data={studioData.cardData}
          flippable={false}
          initialPosition={studioData.cardOrientation}
        />
        <ReverseButton
          onClick={() => {
            setStudioData((studioData) => {
              const newStudioData = structuredClone(studioData);
              newStudioData.cardOrientation =
                newStudioData.cardOrientation === 'front' ? 'back' : 'front';
              return newStudioData;
            });
          }}
        />
        <GlowButton
          onClick={() => {
            navigate('/cards/create/finish-send');
          }}>
          Done
        </GlowButton>
      </div>
      <Toolbar />
    </div>
  );
};

export default Embellish;
