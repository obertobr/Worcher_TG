import React from "react";
import { IonButton } from "@ionic/react";
import style from "./ButtonComponent.module.css"

interface ButtonComponentProps {
  text: string;
  width: string;
  isCancel?: boolean;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (
  { text,
    width,
    isCancel = false,
    onClick 

  }) => {
  return (
    <IonButton className={ (isCancel ? style.red : style.blue) + " " + style.customIonButton} 
                style={{width}}
               onClick={onClick} expand="block">
      {text}
    </IonButton>
  );
};

export default ButtonComponent;
