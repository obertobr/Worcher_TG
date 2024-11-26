import React, { useEffect, useState } from "react";
import TextInputComponent from "../text-input-component/text.input.component";

interface InputCpfComponentProps {
    textLabel?: string;
    placeHolder?: string;
    maxlength?: number;
    value?: string;
    onInputChange: (value: string) => void; 
}

const InputCpfComponent: React.FC<InputCpfComponentProps> = ({
    textLabel,
    placeHolder,
    maxlength = 14,
    value,
    onInputChange,
}) => {

    useEffect(() => {
        if(value){
            handleCpfChange(value)
        }
    },[value])

    const [formattedValue, setFormattedValue] = useState('');

    const handleCpfChange = (value: string) => {
        const formattedCpf = formatCpf(value);
        setFormattedValue(formattedCpf);

        if (onInputChange) {
            onInputChange(formattedCpf);
        }
    };

    const formatCpf = (value: string) => {
        value = value.replace(/\D/g, '');
        
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }

        return value.substring(0, 14);
    };

    return (
        <TextInputComponent
            textLabel={textLabel}
            placeHolder={placeHolder}
            maxlength={maxlength}
            value={formattedValue}
            allowOnlyNumbers={true}
            onInputChange={handleCpfChange}
        />
    );
};

export default InputCpfComponent;
