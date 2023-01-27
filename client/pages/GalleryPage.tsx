import React from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import MovingBackground from '../components/MovingBackground/MovingBackground';
import { Outlet } from 'react-router';

const GalleryPage: React.FC = () => {
  return (
    <MovingBackground night>
      <PageHeader includeNav={false} logoNav='/cards' />
      <Sidebar />
      <Outlet />
    </MovingBackground>
  );
};

export default GalleryPage;
