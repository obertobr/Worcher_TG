import { IonLabel } from "@ionic/react";
import React, { useState, useEffect } from "react";
import style from '../../styleComponents/input.module.css';
import timeStyle from "./timeComponent.module.css";

interface HourMinuteSelectorComponentProps {
    label?: string;
    hour?: string;
    minute?: string;
    onTimeChangeString: (hour: string, minute: string) => void;
    onTimeChange: (datehour: Date) => void;
}

const HourMinuteSelectorComponent: React.FC<HourMinuteSelectorComponentProps> = ({
    label = "Hora",
    hour = "00",
    minute = "00",
    onTimeChangeString,
    onTimeChange,
}) => {
    const [selectedHour, setSelectedHour] = useState(hour);
    const [selectedMinute, setSelectedMinute] = useState(minute);
    const [startX, setStartX] = useState<number | null>(null);

    useEffect(() => {
        onTimeChangeString(selectedHour, selectedMinute);
        onTimeChange(convertHourMinuteInDate(selectedHour,selectedMinute))
    }, [selectedHour, selectedMinute]);

    const convertHourMinuteInDate = (hour: string, minute: string): Date => {
        const date = new Date();
        date.setHours(parseInt(hour, 10)); 
        date.setMinutes(parseInt(minute, 10));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };
    

    const handleDragStart = (event: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        setStartX(clientX);
    };

    const handleDragMove = (event: React.TouchEvent | React.MouseEvent, type: 'hour' | 'minute') => {
        if (startX === null) return;

        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const deltaX = clientX - startX;

        if (Math.abs(deltaX) > 20) { // Ajuste a sensibilidade conforme necessário
            if (type === 'hour') {
                adjustHour(deltaX > 0 ? 1 : -1);
            } else {
                adjustMinute(deltaX > 0 ? 1 : -1);
            }
            setStartX(clientX);
        }
    };

    const handleDragEnd = () => {
        setStartX(null);
    };

    const adjustHour = (change: number) => {
        let newHour = (parseInt(selectedHour || '0') + change + 24) % 24;
        setSelectedHour(newHour.toString().padStart(2, '0'));
    };

    const adjustMinute = (change: number) => {
        let newMinute = (parseInt(selectedMinute || '0') + change + 60) % 60;
        setSelectedMinute(newMinute.toString().padStart(2, '0'));
    };

    const renderHourOptions = () => {
        const hour = parseInt(selectedHour);
        const prevHour = ((hour - 1 + 24) % 24).toString().padStart(2, '0');
        const nextHour = ((hour + 1) % 24).toString().padStart(2, '0');
        return (
            <div className={timeStyle.scrollWrapperHorizontal}>
                <div className={timeStyle.timeOption}>{prevHour}</div>
                <div className={timeStyle.timeOptionSelected}>{selectedHour}</div>
                <div className={timeStyle.timeOption}>{nextHour}</div>
            </div>
        );
    };

    const renderMinuteOptions = () => {
        const minute = parseInt(selectedMinute);
        const prevMinute = ((minute - 1 + 60) % 60).toString().padStart(2, '0');
        const nextMinute = ((minute + 1) % 60).toString().padStart(2, '0');
        return (
            <div className={timeStyle.scrollWrapperHorizontal}>
                <div className={timeStyle.timeOption}>{prevMinute}</div>
                <div className={timeStyle.timeOptionSelected}>{selectedMinute}</div>
                <div className={timeStyle.timeOption}>{nextMinute}</div>
            </div>
        );
    };

    return (
        <div className={style.centerInput}>
            <IonLabel className={style.labelInput}>{label}</IonLabel>
            <div className={timeStyle.contentInputs}>
                <div
                    className={timeStyle.timeInputWrapper}
                    onMouseDown={handleDragStart}
                    onMouseMove={(e) => handleDragMove(e, 'hour')}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={(e) => handleDragMove(e, 'hour')}
                    onTouchEnd={handleDragEnd}
                >
                    {renderHourOptions()}
                </div>
                <span>:</span>
                <div
                    className={timeStyle.timeInputWrapper}
                    onMouseDown={handleDragStart}
                    onMouseMove={(e) => handleDragMove(e, 'minute')}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={(e) => handleDragMove(e, 'minute')}
                    onTouchEnd={handleDragEnd}
                >
                    {renderMinuteOptions()}
                </div>
            </div>
        </div>
    );
};

export default HourMinuteSelectorComponent;
