/* eslint-disable @typescript-eslint/no-empty-function */
import { Grid } from "@mui/material";
import React, { createContext, useEffect, useRef, useState } from "react";
import Header from "./header";
import Monthly from "./monthly";
import Yearly from "./yearly";

export enum CalendarFormat {
  MONTHLY,
  YEARLY,
}

export interface ICalendarContext {
  currentDate: Date;
  setCurrDate: React.Dispatch<React.SetStateAction<Date>>;
  width: number | undefined;
  setFormatCal: React.Dispatch<React.SetStateAction<CalendarFormat>>;
  formatCal: CalendarFormat;
  language: string;
}

const initialContext: ICalendarContext = {
  currentDate: new Date(),
  setCurrDate: () => {},
  width: undefined,
  setFormatCal: () => {},
  formatCal: CalendarFormat.MONTHLY,
  language: "",
};

export const CalendarContext = createContext<ICalendarContext>(initialContext);

interface Props {
  id?: string;
  language: string;
}

const Calendar: React.FC<Props> = (props: Props) => {
  const { id, language } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [currDate, setCurrDate] = useState<Date>(new Date());
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [formatCal, setFormatCal] = useState<CalendarFormat>(
    CalendarFormat.MONTHLY
  );

  const calendarContext: ICalendarContext = {
    currentDate: currDate,
    setCurrDate: setCurrDate,
    width,
    setFormatCal,
    formatCal,
    language,
  };

  const handleResize = () => {
    setWidth(ref.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
  });

  return (
    <CalendarContext.Provider value={calendarContext}>
      <Grid container spacing={1} id={id} ref={ref}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          {formatCal === CalendarFormat.MONTHLY ? (
            <Monthly id={"monthly"} />
          ) : (
            <Yearly id={"yearly"} />
          )}
        </Grid>
      </Grid>
    </CalendarContext.Provider>
  );
};

export default Calendar;
