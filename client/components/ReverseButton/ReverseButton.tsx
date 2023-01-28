import React, { HTMLAttributes } from 'react';
import styles from './ReverseButton.module.scss';

interface ReverseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const ReverseButton: React.FC<ReverseButtonProps> = ({
  className,
  ...rest
}) => {
  return (
    <button className={`${styles.svg} ${className}`} {...rest}>
      <svg
        width='64'
        height='64'
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M53.5056 11.6549L49.5084 18.578L45.5111 25.5011C45.0833 26.243 45.6179 27.1696 46.4743 27.1696H51.5119C50.1287 38.4798 40.4707 47.2702 28.793 47.2702C16.448 47.2702 6.35379 37.4493 5.91262 25.2096C5.89576 24.746 5.52694 24.3743 5.06329 24.3743H1.21008C0.73168 24.3743 0.337577 24.7684 0.35233 25.2461C0.814575 40.5346 13.3956 52.8291 28.7937 52.8291C43.5406 52.8291 55.7009 41.5519 57.1094 27.1689H62.4625C63.3188 27.1689 63.8541 26.2416 63.4256 25.5004L59.4284 18.5773L55.4311 11.6542C55.004 10.913 53.9334 10.913 53.5056 11.6549Z'
          fill='#F0FEFF'
        />
      </svg>
    </button>
  );
};

export default ReverseButton;
