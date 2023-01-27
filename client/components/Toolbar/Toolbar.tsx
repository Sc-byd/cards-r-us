import React from 'react';
import useStudioData from '../../hooks/useStudioData';
import FrontBanner from './FrontBanner/FrontBanner';
import FrontText from './FrontText/FrontText';
import TempColorPicker from './TempColorPicker';
import Texture from './Texture/Texture';
import styles from './Toolbar.module.scss';

const Toolbar = () => {
  const { studioData, setStudioData } = useStudioData();
  return (
    <div className={styles.layout}>
      <FrontText />
      <div className={styles.divider}></div>
      <FrontBanner />
      <div className={styles.divider}></div>
      <Texture />
    </div>
  );
};

export default Toolbar;
