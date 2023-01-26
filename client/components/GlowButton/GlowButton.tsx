import React, { ButtonHTMLAttributes } from 'react';
import styles from './GlowButton.module.scss';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const GlowButton: React.FC<React.PropsWithChildren<GlowButtonProps>> = ({
  children,
  className,
  ...rest
}) => {
  const buttonClasses = `${styles.button} ${className}`;

  return (
    <button className={styles.button} {...rest}>
      <span>{children}</span>
    </button>
  );
};

export default GlowButton;
