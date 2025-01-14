import React from 'react';
import Logo from '../Logo/Logo';
import NeonCircleLink from '../NeonCircleLink/NeonCircleLink';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  includeNav?: boolean;
  logoNav?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  includeNav = true,
  logoNav = '/',
}) => (
  <header className={styles.header}>
    <Logo to={logoNav} />
    {includeNav && (
      <nav className={styles.navigation}>
        <NeonCircleLink to='/login'>Login</NeonCircleLink>
        <NeonCircleLink to='/signup'>Register</NeonCircleLink>
      </nav>
    )}
  </header>
);

export default PageHeader;
