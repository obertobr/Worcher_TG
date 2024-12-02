import { IonInput } from "@ionic/react";
import React, { useRef, useState } from "react";
import "./authComponent.css";

interface AuthComponentProps {
  onCodeComplete: (code: string) => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onCodeComplete }) => {
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const handleInputChange = (e: CustomEvent, index: number) => {
    const value = e.detail.value || "";

    if (value.match(/^[0-9]$/)) {
      code[index] = value;
    } else if (value === "") {
      code[index] = "";
    }

    setCode([...code]);

    onCodeComplete(code.join(""));

    if (value.match(/^[0-9]$/) && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.setFocus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    if (
      !e.key.match(/^[0-9]$/) &&
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="authCodeContainer">
        {[...Array(6)].map((_, index) => (
          <IonInput
            key={index}
            className="auth_code"
            maxlength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            onIonInput={(e) => handleInputChange(e, index)}
            onKeyDown={handleKeyDown}
            type="tel"
          />
        ))}
      </div>
    </>
  );
};

export default AuthComponent;
