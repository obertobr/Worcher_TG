import { IonIcon, IonInput, IonLabel } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import React, { useState } from "react";
import style from '../../styleComponents/input.module.css';

type TextFieldTypes = 'text' | 'password';

interface TextInputComponentProps {
    textLabel?: string;
    typeInput?: TextFieldTypes;
    placeHolder?: string;
    onInputChange: (value: string) => void; 
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
    textLabel,
    typeInput = 'text',
    placeHolder,
    onInputChange,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event: CustomEvent) => {
        const value = event.detail.value!;
        setInputValue(value);
        onInputChange(value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className={style.centerInput}>

            <IonLabel className={style.labelInput}>
                {textLabel}
            </IonLabel>

            <IonInput
                maxlength={32}
                className={style.textInput}
                onIonInput={handleInputChange}
                type={showPassword ? 'text' : typeInput}
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
