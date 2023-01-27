import React from 'react';
import { Outlet } from 'react-router';
import StudioProvider from '../StudioContext/StudioProvider';
import styles from './Studio.module.scss';

const Studio = () => {
  return (
    <div className={styles.container}>
      <StudioProvider>
        <Outlet />
      </StudioProvider>
    </div>
  );
};

export default Studio;
