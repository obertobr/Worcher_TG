import { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

import { IonLabel } from '@ionic/react';
import './colorpickComponent.css';


interface ColorPickerPropsInterface {
  onChange: (color: string) => void
}

const getTextColor = (backgroundColor: any) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  return brightness > 186 ? '#000000' : '#FFFFFF';
};


const ColorPicker: React.FC<ColorPickerPropsInterface> = ({
  onChange,
}) => {
  const [color, setColor] = useState('#ffffff');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  

  const handleChangeColor = (newColor: any) => {
    setColor(newColor.hex);
    onChange(newColor.hex);
  };

  useEffect(() => {
    onChange(color);

    const handleClickOutside = (event: any) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);



  return (
    <div className='colorContent'>
      <IonLabel className='colorLabel'>Cor</IonLabel>
      
      <input
        className='colorInput'
        type="text"
        value={color}
        readOnly
        style={{
          backgroundColor: color,
          color: getTextColor(color),
        }}
        onClick={() => setShowPicker(!showPicker)}
      />

      {showPicker && (
        <div className='colorModal' ref={pickerRef}>
          <SketchPicker
            color={color}
            onChange={handleChangeColor}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
