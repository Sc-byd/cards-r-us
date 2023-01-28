import React from 'react';
import useStudioData from '../../hooks/useStudioData';
import Back from './Back/Back';
import FrontBanner from './FrontBanner/FrontBanner';
import FrontText from './FrontText/FrontText';
import TempColorPicker from './TempColorPicker';
import Texture from './Texture/Texture';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div className={styles.layout}>
      {studioData.cardOrientation === 'front' ? (
        <>
          <FrontText />
          <div className={styles.divider}></div>
          <FrontBanner />
          <div className={styles.divider}></div>
          <Texture />
        </>
      ) : (
        <>
          <Back />
          <div className={styles.divider}></div>
        </>
      )}
    </div>
  );
};

export default Toolbar;
