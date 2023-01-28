import { CircularProgress } from '@mui/joy';
import React from 'react';
import { useNavigate } from 'react-router';
import { CardData } from '../../../server/models/CardModel';
import useUser from '../../hooks/useUser';
import Card from '../Card/Card';
import GlowButton from '../GlowButton/GlowButton';
import NeonCircleLink from '../NeonCircleLink/NeonCircleLink';
import styles from './Gallery.module.scss';

const Gallery = () => {
  const [sentCards, setSentCards] = React.useState<CardData[]>([]);
  const [receivedCards, setReceivedCards] = React.useState<CardData[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      const response = await fetch('/api/cards');
      const data = await response.json();

      console.log('Cards', data);
      console.log('User', user);

      setSentCards(
        data.filter((card: CardData) => card.authorId === user?.userId)
      );
      setReceivedCards(
        data.filter((card: CardData) => card.ownerId === user?.userId)
      );

      setLoading(false);
    };
    fetchCards();
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.createButton}>
        <GlowButton
          onClick={() => {
            navigate('/cards/create/choose-image-type');
          }}>
          Create
        </GlowButton>
      </div>
      <h2>Sent Cards</h2>
      <div className={styles.cards}>
        {loading ? (
          <CircularProgress />
        ) : sentCards.length ? (
          sentCards.map((cardData) => (
            <div
              role='button'
              className={styles.cardButton}
              onClick={() => {
                navigate(`/cards/${cardData.id}`);
              }}>
              <Card
                key={cardData.id}
                data={cardData}
                flippable={false}
                pivot={false}
              />
            </div>
          ))
        ) : (
          <p>You have not sent any cards yet. Create one!</p>
        )}
      </div>
      <h2>Received Cards</h2>
      <div className={styles.cards}>
        {loading ? (
          <></>
        ) : receivedCards.length ? (
          receivedCards.map((cardData) => (
            <div
              role='button'
              className={styles.cardButton}
              onClick={() => {
                navigate(`/cards/${cardData.id}`);
              }}>
              <Card
                key={cardData.id}
                data={cardData}
                flippable={false}
                pivot={false}
              />
            </div>
          ))
        ) : (
          <p>
            You have not received any cards yet. Tell your friends about us!
          </p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
