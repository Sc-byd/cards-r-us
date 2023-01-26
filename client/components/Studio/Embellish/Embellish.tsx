import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import Card from '../../Card/Card';
import Toolbar from '../../Toolbar/Toolbar';
import styles from './Embellish.module.scss';

const Embellish = () => {
  const { studioData } = useStudioData();
  return (
    <div className={styles.layout}>
      <Card data={studioData.cardData} />
      <Toolbar />
    </div>
  );
};

export default Embellish;
