import React from 'react';
import { CardData } from '../../../../server/models/CardModel';

export interface StudioData {
  cardData: CardData;
  imagePrompt?: string;
  cardOrientation: 'front' | 'back';
}

const DEFAULT_CARD: CardData = {
  image: {
    src: 'https://picsum.photos/200',
    alt: 'random image',
  },
  backgroundColor: 'beige',
  banner: {
    enabled: false,
    color: 'white',
  },
  texture: {
    pattern: 'none',
    intensity: 50,
  },
  text: {
    front: {
      value: '',
      color: 'black',
      position: 'bottom',
    },
    back: {
      value: '',
      color: 'black',
    },
  },
  id: '123',
  authorId: '123',
  ownerId: '123',
  createdAt: new Date(),
};

interface StudioContext {
  studioData: StudioData;
  setStudioData: React.Dispatch<React.SetStateAction<StudioData>>;
}

export const StudioDataContext = React.createContext<StudioContext>({
  studioData: {
    cardData: DEFAULT_CARD,
    cardOrientation: 'front',
  },
  setStudioData: () => {},
});

const StudioProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [studioData, setStudioData] = React.useState<StudioData>({
    cardData: DEFAULT_CARD,
    cardOrientation: 'front',
  });
  return (
    <StudioDataContext.Provider value={{ studioData, setStudioData }}>
      {children}
    </StudioDataContext.Provider>
  );
};

export default StudioProvider;
