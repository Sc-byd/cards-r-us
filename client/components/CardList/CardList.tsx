import { FilterList } from '@mui/icons-material';
import { Button } from '@mui/joy';
import React from 'react';
import { useNavigate } from 'react-router';
import { CardData } from '../../../server/models/CardModel';
import useUser from '../../hooks/useUser';
import Card from '../Card/Card';
import styles from './CardList.module.scss';

const FILTERS = ['All', 'Sent', 'Received'];

const CardList = () => {
  const [filterIndex, setFilterIndex] = React.useState(0);
  const [cards, setCards] = React.useState<CardData[]>([]);
  const [filteredCards, setFilteredCards] = React.useState<CardData[]>([]);

  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) return;
    const getCards = async () => {
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
    };
    getCards();
  }, [user]);

  React.useEffect(() => {
    setFilteredCards((cards) => {
      switch (filterIndex) {
        case 0:
          return cards;
        case 1:
          return cards.filter((card) => card.authorId === user?.userId);
        case 2:
          return cards.filter((card) => card.ownerId === user?.userId);
        default:
          return cards;
      }
    });
  }, [filterIndex, cards]);

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterIndex((filterIndex) => (filterIndex + 1) % FILTERS.length);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={handleFilter}
        startDecorator={<FilterList />}
        variant='soft'>
        {FILTERS[filterIndex]}
      </Button>
      <div className={styles.list}>
        <ul>
          {filteredCards.map((card) => {
            return (
              <li
                key={card.id}
                onClick={() => {
                  navigate(`/cards/${card.id}`);
                }}>
                <Card data={card} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardList;
