import React from 'react';

interface TempColorPickerProps {
  onColorChange: (color: string) => void;
}

const TempColorPicker: React.FC<TempColorPickerProps> = ({ onColorChange }) => {
  return (
    <div>
      <button onClick={() => onColorChange('#FF9999')}>Red</button>
      <button onClick={() => onColorChange('#9999FF')}>Blue</button>
      <button onClick={() => onColorChange('#99FF99')}>Green</button>
    </div>
  );
};

export default TempColorPicker;
