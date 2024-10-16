import React from "react";
import { IonButton } from "@ionic/react";
import "./ButtonComponent.css";

interface ButtonComponentProps {
  text: string;
  width: string;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ text,width, onClick }) => {
  return (
    <IonButton className="custom-ion-button" 
                style={{width}}
               onClick={onClick} expand="block">
      {text}
    </IonButton>
  );
};

export default ButtonComponent;
