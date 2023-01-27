import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import StudioProvider from '../StudioContext/StudioProvider';
import styles from './Studio.module.scss';

const Studio = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/cards/create/choose-image-type');
  }, []);

  return (
    <div className={styles.container}>
      <StudioProvider>
        <Outlet />
      </StudioProvider>
    </div>
  );
};

export default Studio;
