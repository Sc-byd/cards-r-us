import React from 'react';
import useStudioData from '../../../hooks/useStudioData';
import styles from './ColorPicker.module.scss';
import { SketchPicker } from 'react-color';
import { ClickAwayListener, PopperUnstyled } from '@mui/base';
import { styled } from '@mui/joy';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const Popup = styled(PopperUnstyled)({
  zIndex: 1000,
});

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onColorChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={styles.square}
        style={{
          backgroundColor: color,
        }}></div>
      <Popup
        role={undefined}
        id='composition-menu'
        open={open}
        anchorEl={anchorEl}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <SketchPicker
              color={color}
              onChange={(color) => {
                onColorChange(color.hex);
              }}
            />
          </div>
        </ClickAwayListener>
      </Popup>
    </>
  );
};

export default ColorPicker;
