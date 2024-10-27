import React, { useState } from "react";
import { IonDatetime, IonLabel } from "@ionic/react";
import './dateComponent.css'
import DateUtil from "../../../../Utils/DateUtil";


type DateTimePickerType = "date" | "time";

interface DateComponentProps {
  type: DateTimePickerType;
  textLabel?: string;
  onDateTimeChange: (value: Date) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({
  type,
  onDateTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
      
      <IonDatetime
      color="white"
        className="dateComponent"
        onIonChange={handleDateTimeChange}
        value={selectedDate ? selectedDate.toISOString() : undefined}
        presentation={type === "date" ? "date" : "date-time"}
      />

      <IonLabel className="labelInput">{selectedDate != null ? DateUtil.formatToDDMMYYYYAndDay(selectedDate) : ""}</IonLabel>
    </div>
  );
};

export default DateComponent;
