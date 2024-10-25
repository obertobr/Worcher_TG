import { IonIcon, IonInput, IonLabel } from "@ionic/react";
import React, { useState, useEffect } from "react";
import style from '../../styleComponents/input.module.css';
import { eye, eyeOff } from "ionicons/icons";

type TextFieldTypes = 'text' | 'password';

interface TextInputComponentProps {
    textLabel?: string;
    placeHolder?: string;
    typeInput?: TextFieldTypes;
    maxlength?: number;
    value?: string;
    onInputChange: (value: string) => void;
    allowOnlyNumbers?: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
    textLabel,
    placeHolder,
    typeInput = 'text',
    maxlength = 50,
    value,
    onInputChange,
    allowOnlyNumbers = false,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event: CustomEvent) => {
        const newValue = event.detail.value || '';
        setInputValue(newValue); 
        onInputChange(newValue); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    
        if (allowOnlyNumbers) {
            const char = String.fromCharCode(event.charCode);
           
            if (!/\d/.test(char)) {
                event.preventDefault(); 
            }
        }
    };

    return (
        <div className={style.centerInput}>
            <IonLabel className={style.labelInput}>{textLabel}</IonLabel>
            <IonInput
                maxlength={maxlength}
                className={style.textInput}
                type={showPassword ? 'text' : typeInput}
                onIonInput={handleInputChange}
                onKeyPress={handleKeyPress}
                value={inputValue}
                placeholder={placeHolder}
            />

            { typeInput == 'password' ? 
                (
                    <IonIcon 
                        icon={showPassword ? eye : eyeOff} 
                        onClick={togglePasswordVisibility}
                        className={style.checkmark}
                    />
                ) : (<></>) }  
        </div>
    );
};

export default TextInputComponent;
