import { Input } from '@mui/joy';
import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import useStudioData from '../../../hooks/useStudioData';
import Card from '../../Card/Card';
import GlowButton from '../../GlowButton/GlowButton';
import styles from './FinishSend.module.scss';

const FinishSend = () => {
  const { studioData } = useStudioData();
  const navigate = useNavigate();

  const [input, setInput] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardData: studioData.cardData,
        recipientEmail: input,
      }),
    });
    if (response.status === 200) {
      console.log('Card created successfully');
      navigate('/cards');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.glowtext}>Who do you want to send this to?</h2>
      <Card data={studioData.cardData} />
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type='email'
          placeholder='Enter an email address'
          sx={{
            width: 'min(90%, 400px)',
            filter: 'drop-shadow(0px 0px 4px #b4ffffd0)',
          }}
        />
        <GlowButton type='submit'>Send</GlowButton>
      </Form>
    </div>
  );
};

export default FinishSend;
