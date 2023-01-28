import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
import React from 'react';
import styles from './LogoutButton.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';
interface LogoutButtonProps {
  collapsed: boolean;
}
const LogoutButton: React.FC<LogoutButtonProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      style={{ justifyContent: collapsed ? 'flex-end' : 'center' }}>
      {collapsed ? (
        <IconButton variant='plain' className={styles.icon}>
          <Logout />
        </IconButton>
      ) : (
        <button onClick={() => navigate('/logout')} className={styles.button}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
