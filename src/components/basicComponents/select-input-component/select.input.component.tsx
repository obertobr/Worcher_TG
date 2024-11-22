import { IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useState, useEffect, MouseEventHandler } from "react";
import selectInputItens from "../../../../Models/Interfaces/selectInput"
import styleInput from '../../styleComponents/select.module.css';

interface SelectInputComponentProps {
    itens: selectInputItens[];
    isDisabled?: boolean;
    isReadOnly?: boolean;
    textLabel?: string;
    placeHolder?: string;
    value?: number;
    disabled?: boolean;
    multiple?: boolean;
    onInputChange: (value: any) => void;
    style?: CSSModuleClasses;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const SelectInputComponent: React.FC<SelectInputComponentProps> = ({
    itens,
    isReadOnly = false,
    textLabel,
    placeHolder,
    value,
    disabled = false,
    multiple = false,
    onInputChange,
    style = styleInput,
    onClick = () => { },
}) => {
    const [inputValue, setInputValue] = useState<number | number[] | undefined>(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleSelectChange = (event: CustomEvent) => {
        if (isReadOnly) return;

        if(!multiple){
            const newValue = event.detail.value || '';
            setInputValue(newValue);
            onInputChange(itens.find(item => item.id == newValue));
        } else {
            const newValues: number[] = event.detail.value || '';
            setInputValue(newValues);
            onInputChange(newValues.map(newValue => {return itens.find(item => item.id == newValue)}));
        }
    };

    return (
        <div onClick={onClick} className={style.centerInput}>
            <IonLabel className={style.labelInput}>{textLabel}</IonLabel>
            <IonList className={style.selectListInput}>
                <IonItem className={style.selectItemInput}>
                    <IonSelect
                        disabled={disabled}
                        multiple={multiple}
                        placeholder={placeHolder}
                        value={inputValue}
                        onIonChange={handleSelectChange}
                    >
                        {itens.map((item: selectInputItens) => (
                            <IonSelectOption key={item.id} value={item.id}>
                                {item.getDisplayName ? item.getDisplayName() : "Nome indisponível"}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                </IonItem>
            </IonList>
        </div>
    );
};

export default SelectInputComponent;
