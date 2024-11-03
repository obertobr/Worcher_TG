import React, { useEffect, useState } from "react";
import "./checkBox.css"

interface CheckBoxComponentProps {
    textCheckBox: string,
    changeValue: Function,
    value?: boolean
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({ textCheckBox, changeValue, value }) => {
  useEffect( () => {
      if(value) setChecked(value)
    },[value]
  )

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    const valueChecked = !checked
    setChecked(valueChecked);
    changeValue(valueChecked)
  };

  return (
    <label className="remember-password">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      {textCheckBox}
    </label>
  );
};

export default CheckBoxComponent;
