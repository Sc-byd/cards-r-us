import React from 'react';
import { StudioDataContext } from '../components/Studio/StudioContext/StudioProvider';

const useStudioData = () => {
  const { studioData, setStudioData } = React.useContext(StudioDataContext);

  return { studioData, setStudioData };
};

export default useStudioData;
