import React, { useState } from "react";
import "./checkBox.css"

interface CheckBoxComponentProps {
    textCheckBox: string
}

const CheckBoxComponent: React.FC<CheckBoxComponentProps> = ({ textCheckBox }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
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
