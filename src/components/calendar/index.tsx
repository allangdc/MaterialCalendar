/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState } from "react";
import Header from "./header";
import Monthly from "./monthly";

interface ICalendarContext {
  currentDate: Date;
  setCurrDate: React.Dispatch<React.SetStateAction<Date>>;
}

const initialContext: ICalendarContext = {
  currentDate: new Date(),
  setCurrDate: () => {},
};

export const CalendarContext = createContext<ICalendarContext>(initialContext);

interface Props {
  id?: string;
}

const Calendar: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const calendarContext: ICalendarContext = {
    currentDate: currDate,
    setCurrDate: setCurrDate,
  };

  return (
    <div id={id}>
      <CalendarContext.Provider value={calendarContext}>
        <Header />
        <Monthly id={"monthly"} currentDate={currDate} language="pt-BR" />
      </CalendarContext.Provider>
    </div>
  );
};

export default Calendar;
