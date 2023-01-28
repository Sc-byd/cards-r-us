import React from 'react';
import { CardData } from '../../../server/models/CardModel';
import Card from './Card';

describe('Card', () => {
  it('should render', () => {
    const cardData: CardData = {
      image: {
        src: 'https://picsum.photos/200',
        alt: 'random image',
      },
      banner: {
        enabled: false,
        color: 'white',
      },
      texture: {
        pattern: 'none',
        intensity: 0.5,
      },
      backgroundColor: 'beige',
      text: {
        front: {
          value: 'front',
          color: 'black',
          position: 'top',
        },
        back: {
          value: 'back',
          color: 'white',
        },
      },
      authorId: '123',
      id: '123',
      ownerId: '123',
      createdAt: new Date(),
    };

    cy.mount(<Card data={cardData} />);
  });
});
