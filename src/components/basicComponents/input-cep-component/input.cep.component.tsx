import React, { useState } from "react";
import TextInputComponent from "../text-input-component/text.input.component";

interface InputCepComponentProps {
    textLabel?: string;
    placeHolder?: string;
    maxlength?: number;
    onInputChange: (value: string) => void; 
}

const InputCepComponent: React.FC<InputCepComponentProps> = ({
    textLabel,
    placeHolder,
    maxlength = 9,
    onInputChange,
}) => {
    const [formattedValue, setFormattedValue] = useState('');

    const handleCepChange = (value: string) => {
        const formattedCep = formatCep(value);
        setFormattedValue(formattedCep);

        if (onInputChange) {
            onInputChange(formattedCep);
        }
    };

    const formatCep = (value: string) => {
        value = value.replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }

        return value.substring(0, 9);
    };

    return (
        <TextInputComponent
            textLabel={textLabel}
            placeHolder={placeHolder}
            maxlength={maxlength}
            value={formattedValue}
            allowOnlyNumbers={true}
            onInputChange={handleCepChange}
        />
    );
};

export default InputCepComponent;
