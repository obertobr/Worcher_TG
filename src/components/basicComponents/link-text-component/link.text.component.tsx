import React from "react";
import "./linkText.css"

interface LinkTextComponentProps {
  text: string;
  onClick: () => void;
}

const LinkTextComponent : React.FC<LinkTextComponentProps> = ({ text, onClick }) => {
  return (
    <span className="forgot-password" onClick={onClick}>
      {text}
    </span>
  );
};

export default LinkTextComponent;
