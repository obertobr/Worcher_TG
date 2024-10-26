import { IonInput } from "@ionic/react";
import React, { useRef } from 'react';
import './authComponent.css';

const AuthComponent: React.FC<{}> = () => {
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);

  const handleInputChange = (e: CustomEvent, index: number) => {
    const value = e.detail.value || "";

    if (value.length > 1 && e.target != null) {
      //Erro apenas visual, VSCODE está sendo um chupeta (coisa de typescript)
      e.target.value = value.charAt(0); 
    }

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.setFocus();
    }
  };

  return (
    <>
      <div className="authCodeContainer">
        {[...Array(5)].map((_, index) => (
          <IonInput
            key={index}
            className="auth_code"
            maxlength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            onIonInput={(e) => handleInputChange(e, index)}
            type="number"
          />
        ))}
      </div>
    </>
  );
}

export default AuthComponent;