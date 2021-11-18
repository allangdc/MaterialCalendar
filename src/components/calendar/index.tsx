/* eslint-disable @typescript-eslint/no-empty-function */
import { Grid, Typography } from "@mui/material";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfToday,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { pt } from "date-fns/locale";
import startOfMonth from "date-fns/startOfMonth";
import _ from "lodash";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Bar, { BarType } from "./bars/bar";
import Cells from "./cells";
import Header from "./header";
import Monthly from "./monthly";
import Yearly from "./yearly";

export enum CalendarFormat {
  MONTHLY,
  YEARLY,
}

export interface ICalendarContext {
  currDate: Date;
  setCurrDate: React.Dispatch<React.SetStateAction<Date>>;
  width: number | undefined;
  setFormatCal: React.Dispatch<React.SetStateAction<CalendarFormat>>;
  formatCal: CalendarFormat;
  language: string;
  holidays: Array<CalendarHoliday> | undefined;
  holidayColor: string | undefined;
  lineColor: string | undefined;
  dataArray: Array<ReactNode>;
  setDataArray: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  headerArray: Array<ReactNode>;
  setHeaderArray: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  sameWidthP100: string | undefined;
  rangeBars: Array<CalendarRangeBar> | undefined;
}

const initialContext: ICalendarContext = {
  currDate: startOfToday(),
  setCurrDate: () => {},
  width: undefined,
  setFormatCal: () => {},
  formatCal: CalendarFormat.MONTHLY,
  language: "",
  holidays: undefined,
  holidayColor: undefined,
  lineColor: undefined,
  dataArray: [],
  setDataArray: () => {},
  headerArray: [],
  setHeaderArray: () => {},
  sameWidthP100: undefined,
  rangeBars: undefined,
};

export interface CalendarHoliday {
  title: string;
  day: Date;
  yearly: boolean;
}

export interface CalendarRangeBar {
  category: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

export const CalendarContext = createContext<ICalendarContext>(initialContext);

interface Props {
  id?: string;
  language: string;
  holidays?: Array<CalendarHoliday>;
  holidayColor?: string;
  rangeBars?: Array<CalendarRangeBar>;
  borderLineColor?: string;
}

const Calendar: React.FC<Props> = (props: Props) => {
  const { id, language, holidays, holidayColor, borderLineColor, rangeBars } =
    props;
  const ref = useRef<HTMLDivElement>(null);
  const [currDate, setCurrDate] = useState<Date>(startOfToday());
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [formatCal, setFormatCal] = useState<CalendarFormat>(
    CalendarFormat.MONTHLY
  );
  const [dataArray, setDataArray] = useState<Array<ReactNode>>([]);
  const [headerArray, setHeaderArray] = useState<Array<ReactNode>>([]);
  const [sameWidthP100, setSameWidthP100] = useState<string>("100%");

  const calendarContext: ICalendarContext = {
    currDate,
    setCurrDate,
    width,
    setFormatCal,
    formatCal,
    language,
    holidays,
    holidayColor,
    lineColor: borderLineColor || "rgb(223 223 222)",
    dataArray,
    setDataArray,
    headerArray,
    setHeaderArray,
    sameWidthP100,
    rangeBars,
  };

  const NCol = () => headerArray.length;

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const ncol = NCol();
    if (ncol > 0) {
      const wdt = `${Math.round(100 / ncol)}%`;
      setSameWidthP100(wdt);
    }
  }, [headerArray.length, formatCal, currDate]);

  const handleResize = () => {
    setWidth(ref.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
  });

  useEffect(() => {
    if (formatCal === CalendarFormat.MONTHLY) {
      getDays();
    } else {
      getMonths();
    }
  }, [currDate, width, formatCal]);

  useEffect(() => {
    if (formatCal === CalendarFormat.MONTHLY) {
      getWeekName();
    } else {
      getMonthName();
    }
  }, [width, formatCal]);

  const getDays = (): void => {
    const data = new Array<Date>();
    const initCal = startOfDay(startOfWeek(startOfMonth(currDate)));
    const endCal = startOfDay(endOfWeek(endOfMonth(currDate)));

    let i: Date = initCal;
    while (differenceInDays(i, endCal) <= 0) {
      data.push(i);
      i = addDays(i, 1);
    }
    const darray = data.map((item, index) => (
      <Cells key={`cells_dt_${index}`} day={item}>
        <Bar barType={BarType.MID} text={`oi dia ${item.getDate()}`} />
      </Cells>
    ));
    if (darray.length > 0) setDataArray(darray);
  };

  const getWeekName = (): void => {
    const data = new Array<string>();
    const initCal = startOfDay(startOfWeek(currDate));
    const endCal = startOfDay(endOfWeek(initCal));

    let i: Date = initCal;
    while (differenceInDays(i, endCal) <= 0) {
      const ultraShortWeekname = i
        .toLocaleDateString(language, {
          weekday: "short",
        })
        .slice(0, 1);
      const shortWeekname = i
        .toLocaleDateString(language, {
          weekday: "short",
        })
        .slice(0, 3);
      const longWeekname = i
        .toLocaleDateString(language, {
          weekday: "long",
        })
        .split("-")[0];
      if (width && width > 500) {
        data.push(_.capitalize(longWeekname));
      } else if (width && width > 270) {
        data.push(_.capitalize(shortWeekname));
      } else {
        data.push(_.capitalize(ultraShortWeekname));
      }
      i = addDays(i, 1);
    }

    const harray = data.map((item, index) => (
      <Typography key={`typo_harray_${index}`} align="center">
        {item}
      </Typography>
    ));

    if (harray.length > 0) setHeaderArray(harray);
  };

  const getMonths = (): void => {
    const data = new Array<Date>();
    const initCal = startOfDay(startOfYear(currDate));
    const endCal = startOfDay(startOfMonth(endOfYear(initCal)));

    let i: Date = initCal;
    while (differenceInMonths(i, endCal) <= 0) {
      data.push(i);
      i = addMonths(i, 1);
    }

    const darray = data.map((item, index) => (
      <Cells key={`cells_dtmon_${index}`} day={item} />
    ));

    if (darray.length > 0) setDataArray(darray);
  };

  const getMonthName = () => {
    const data = new Array<string>();
    const initCal = startOfDay(startOfYear(currDate));
    const endCal = startOfDay(startOfMonth(endOfYear(initCal)));

    let i: Date = initCal;
    while (differenceInMonths(i, endCal) <= 0) {
      const shortMonthName = _.capitalize(format(i, "MMM", { locale: pt }));
      const longMonthName = _.capitalize(format(i, "MMMM", { locale: pt }));
      const ultraShortMonthName = _.capitalize(
        format(i, "MMMMM", { locale: pt })
      );
      if (width && width > 970) {
        data.push(longMonthName);
      } else if (width && width > 470) {
        data.push(shortMonthName);
      } else {
        data.push(ultraShortMonthName);
      }
      i = addMonths(i, 1);
    }

    const monthsArray = data.map((item, index) => (
      <Typography key={`typo_month_a${index}`} align="center">
        {item}
      </Typography>
    ));

    if (monthsArray) setHeaderArray(monthsArray);
  };

  const GenericCalendar: React.FC = () => (
    <>
      {formatCal === CalendarFormat.MONTHLY && <Monthly />}
      {formatCal === CalendarFormat.YEARLY && <Yearly />}
    </>
  );

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
          <GenericCalendar />
        </Grid>
      </Grid>
    </CalendarContext.Provider>
  );
};

export default Calendar;
