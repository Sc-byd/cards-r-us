import { CircularProgress } from '@mui/joy';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { CardData } from '../../../server/models/CardModel';
import Card from '../Card/Card';
import styles from './CardView.module.scss';

const CardView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = React.useState<CardData | null>(null);

  React.useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch(`/api/cards/${id}`);
      const data = await response.json();
      setCardData(data);
    };
    fetchCard();
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate('/cards');
      }}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}>
        {!cardData ? <CircularProgress /> : <Card data={cardData} />}
      </div>
    </div>
  );
};

export default CardView;
