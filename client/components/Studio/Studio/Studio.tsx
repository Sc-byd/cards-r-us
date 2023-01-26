import React from 'react';
import { Outlet } from 'react-router';
import StudioProvider from '../StudioContext/StudioProvider';

const Studio = () => {
  return (
    <div>
      <StudioProvider>
        <Outlet />
      </StudioProvider>
    </div>
  );
};

export default Studio;
