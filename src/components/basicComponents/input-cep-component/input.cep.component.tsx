import React, { useEffect, useState } from "react";
import TextInputComponent from "../text-input-component/text.input.component";

interface InputCepComponentProps {
    textLabel?: string;
    placeHolder?: string;
    maxlength?: number;
    value?: string;
    onInputChange: (value: string) => void; 
}

const InputCepComponent: React.FC<InputCepComponentProps> = ({
    textLabel,
    placeHolder,
    maxlength = 9,
    value,
    onInputChange,
}) => {
    useEffect(() => {
        if(value)
            setFormattedValue(value)
    },[value])

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
