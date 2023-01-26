import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import useStudioData from '../../../hooks/useStudioData';

const FinishSend = () => {
  const { studioData } = useStudioData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const response = await fetch('/api/cards/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardData: studioData.cardData,
      }),
    });
    if (response.status === 200) {
      console.log('Card created successfully');
      navigate('/cards');
    }
  };

  return (
    <div>
      <h2>Who do you want to send this to?</h2>
      <Form onSubmit={handleSubmit}>
        <input type='text' />
        <button type='submit'>Send</button>
      </Form>
    </div>
  );
};

export default FinishSend;
