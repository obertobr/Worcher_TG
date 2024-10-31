import { IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useState, useEffect, MouseEventHandler } from "react";
import style from '../../styleComponents/select.module.css';

export interface selectInputItens {
    id: number;
    name: string;
}

interface TextInputComponentProps {
    itens: selectInputItens[];
    isDisabled?: boolean;
    isReadOnly?: boolean;
    textLabel?: string;
    placeHolder?: string;
    value?: string;
    onInputChange: (value: string) => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const SelectInputComponent: React.FC<TextInputComponentProps> = ({
    itens,
    isReadOnly = false,
    textLabel,
    placeHolder,
    value,
    onInputChange,
    onClick = () => { },
}) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleSelectChange = (event: CustomEvent) => {
        if (isReadOnly) return;

        const newValue = event.detail.value || '';
        setInputValue(newValue);
        onInputChange(newValue);
    };

    return (
        <div onClick={onClick} className={style.centerInput}>
            <IonLabel className={style.labelInput}>{textLabel}</IonLabel>
            <IonList className={style.selectListInput}>
                <IonItem className={style.selectItemInput}>
                    <IonSelect
                        placeholder={placeHolder}
                        value={inputValue}
                        onIonChange={handleSelectChange}
                    >
                        {itens.map((item) => (
                            <IonSelectOption key={item.id} value={item}>
                                {item.name}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
            </IonList>
        </div>
    );
};

export default SelectInputComponent;
