import React from 'react';
import Sponsors from '../components/Sponsors/Sponsors';
import LandingHeader from '../components/PageHeader/PageHeader';
import MovingBackground from '../components/MovingBackground/MovingBackground';
import { Outlet } from 'react-router';

const Landing = () => (
  <MovingBackground>
    <LandingHeader />
    <Outlet />
    <Sponsors />
  </MovingBackground>
);

export default Landing;
