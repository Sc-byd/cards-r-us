import React from 'react';
import styles from './Card.module.scss';
import { CardData } from '../../../server/models/CardModel';

import paperTexture from '/client/images/textures/paper.png';
import cardboardTexture from '/client/images/textures/cardboard.png';
import metalTexture from '/client/images/textures/aluminum.png';
import leatherTexture from '/client/images/textures/leather.png';
import woodTexture from '/client/images/textures/wood.png';
import fabricTexture from '/client/images/textures/fabric.png';

export type Texture = keyof typeof TEXTURES;

export const TEXTURES = {
  none: '',
  paper: paperTexture,
  cardboard: cardboardTexture,
  metal: metalTexture,
  leather: leatherTexture,
  wood: woodTexture,
  fabric: fabricTexture,
} as const;

interface CardProps {
  data: CardData;
  flippable?: boolean;
  initialPosition?: 'front' | 'back';
  scale?: number;
  pivot?: boolean;
}

const Card: React.FC<CardProps> = ({
  data,
  flippable = true,
  initialPosition = 'front',
  scale = 1,
  pivot = true,
}) => {
  const [flipped, setFlipped] = React.useState(
    initialPosition === 'back' ? true : false
  );
  const [pivotDisabled, setPivotDisabled] = React.useState(!pivot);
  const [xPivot, setXPivot] = React.useState(0);
  const [yPivot, setYPivot] = React.useState(0);

  // interpolate range -100 to 100 to 0 to 100
  const shinePosition = (xPivot + -yPivot) / 2 + 50;

  React.useEffect(() => {
    setFlipped(initialPosition === 'back' ? true : false);
  }, [initialPosition]);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (pivotDisabled) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const offsetX = clientX - left;
    const offsetY = clientY - top;

    const rY = 50 * (offsetX / width - 0.5);
    const rX = 50 * (offsetY / height - 0.5);

    setXPivot(rX);
    setYPivot(rY);
  };

  const handleClick = () => {
    if (!flippable) return;
    setFlipped((flipped) => !flipped);
    setXPivot(0);
    setYPivot(0);
    setPivotDisabled(true);
    setTimeout(() => setPivotDisabled(!pivot), 700);
  };

  const handlePointerLeave = () => {
    setXPivot(0);
    setYPivot(0);
  };

  const yRotation = yPivot + (flipped ? 180 : 0);
  const xRotation = xPivot * (flipped ? 1 : -1);

  const frontBannerPosition = {
    top: '12%',
    middle: '42%',
    bottom: '75%',
  }[data.text.front.position];

  return (
    <div
      className={styles.outer}
      style={{
        transform: `scale(${scale})`,
      }}>
      <div
        className={styles.inner}
        style={{
          transform: `rotateY(${yRotation}deg) rotateX(${xRotation}deg)`,
        }}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}>
        <div className={styles.front}>
          {data.texture.pattern !== 'none' && (
            <img
              className={styles.texture}
              src={TEXTURES[data.texture.pattern]}
              style={{
                opacity: data.texture.intensity / 100,
              }}
              draggable={false}
            />
          )}
          {/* <div
            className={styles.shine}
            style={{
              backgroundImage: `linear-gradient(
                55deg,
                transparent,
                rgba(255 255 255 / 0.1) ${shinePosition}%,
                transparent)`,
            }}></div> */}
          <div
            className={styles.banner}
            style={{
              backgroundColor: data.banner.enabled
                ? data.banner.color
                : 'transparent',
              top: frontBannerPosition,
              boxShadow: data.banner.enabled
                ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'
                : 'none',
            }}>
            <h2 style={{ color: data.text.front.color }}>
              {data.text.front.value}
            </h2>
          </div>
          <img
            src={data.image.src}
            alt={data.image.alt}
            className={styles.image}
            draggable={false}
          />
        </div>
        <div
          className={styles.back}
          style={{ backgroundColor: data.backgroundColor }}>
          {data.texture.pattern !== 'none' && (
            <img
              className={styles.texture}
              src={TEXTURES[data.texture.pattern]}
              style={{
                opacity: data.texture.intensity / 100,
              }}
              draggable={false}
            />
          )}
          <p style={{ color: data.text.back.color }}>{data.text.back.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
