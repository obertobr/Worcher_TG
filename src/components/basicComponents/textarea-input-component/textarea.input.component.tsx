import { IonLabel, IonTextarea } from "@ionic/react";
import React, { useState, useEffect, MouseEventHandler } from "react";
import style from '../../styleComponents/textarea.module.css';

interface TextInputComponentProps {
    isDisabled?: boolean;
    isReadOnly?: boolean;
    autoGrow?: boolean;
    textLabel?: string;
    placeHolder?: string;
    maxlength?: number;
    value?: string;
    onInputChange: (value: string) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const TextAreaInputComponent: React.FC<TextInputComponentProps> = ({
    isDisabled = false,
    isReadOnly = false,
    autoGrow = true,
    textLabel,
    placeHolder,
    maxlength = 500,
    value,
    onInputChange,
    onClick = () => {},
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (event: CustomEvent) => {
        if(isReadOnly) return;

        const newValue = event.detail.value || '';
        setInputValue(newValue); 
        onInputChange(newValue); 
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLIonTextareaElement>) => {
    
        if(isReadOnly){
            event.preventDefault();
            return
        }
    };

    return (
        <div onClick={onClick} className={style.centerInput}>
            <IonLabel className={style.labelInput}>{textLabel}</IonLabel>
            <IonTextarea
                disabled={isDisabled}
                maxlength={maxlength}
                className={style.textInput}
                onIonInput={handleInputChange}
                onKeyPress={handleKeyPress}
                value={inputValue}
                placeholder={placeHolder}
                autoGrow={autoGrow}
            /> 
        </div>
    );
};

export default TextAreaInputComponent;
