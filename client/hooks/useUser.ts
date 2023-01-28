import React from 'react';

export interface User {
  email: string;
  username: string;
  avatar: string;
  name: string;
  userId: string;
}

const useUser = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/me');
      const data = await response.json();
      if (response.status !== 200) {
        setError(true);
        console.log('Error occured: ', data);
      }
      console.log('data: ', data);
      setUser(data); //TODO: Uncomment this line after updating the API
    };

    getUser();
  }, []);

  return { user, error };
};

export default useUser;
