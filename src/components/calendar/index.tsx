/* eslint-disable @typescript-eslint/no-empty-function */
import { Grid } from "@mui/material";
import { startOfToday } from "date-fns";
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
  holidays: Array<CalendarHoliday> | undefined;
  holidayColor: string | undefined;
  lineColor: string | undefined;
}

const initialContext: ICalendarContext = {
  currentDate: startOfToday(),
  setCurrDate: () => {},
  width: undefined,
  setFormatCal: () => {},
  formatCal: CalendarFormat.MONTHLY,
  language: "",
  holidays: undefined,
  holidayColor: undefined,
  lineColor: undefined,
};

export interface CalendarHoliday {
  title: string;
  day: Date;
  yearly: boolean;
}

export const CalendarContext = createContext<ICalendarContext>(initialContext);

interface Props {
  id?: string;
  language: string;
  holidays?: Array<CalendarHoliday>;
  holidayColor?: string;
  borderLineColor?: string;
}

const Calendar: React.FC<Props> = (props: Props) => {
  const { id, language, holidays, holidayColor, borderLineColor } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [currDate, setCurrDate] = useState<Date>(startOfToday());
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
    holidays,
    holidayColor,
    lineColor: borderLineColor || "rgb(223 223 222)",
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
          <Header data-testid="calendar-header" />
        </Grid>
        <Grid item xs={12}>
          {width}
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
