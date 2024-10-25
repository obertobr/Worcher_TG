import React, { useState } from "react";
import { IonDatetime, IonLabel } from "@ionic/react";
import './dateComponent.css'


type DateTimePickerType = "date" | "time";

interface DateComponentProps {
  type: DateTimePickerType;
  textLabel?: string;
  onDateTimeChange: (value: Date) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  type,
  textLabel,
  onDateTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateTimeChange = (event: CustomEvent) => {
    const value = event.detail.value || "";
    let newDate: Date;

    if (type === "date") {
      newDate = new Date(value);
      newDate.setHours(0, 0, 0, 0);
    } else {
      newDate = new Date(value);
    }

    setSelectedDate(newDate);
    onDateTimeChange(newDate);
  };

  return (
    <div className="centerInput">
      <IonLabel className="labelInput">{textLabel}</IonLabel>
      <IonDatetime
        onIonChange={handleDateTimeChange}
        value={selectedDate ? selectedDate.toISOString() : undefined}
        showDefaultButtons={true}
        presentation={type === "date" ? "date" : "date-time"}
      />
    </div>
  );
};

export default DateComponent;
