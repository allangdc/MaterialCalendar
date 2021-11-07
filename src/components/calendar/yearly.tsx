/* eslint-disable react/jsx-key */
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Table from "./table";
import {
  addMonths,
  differenceInMonths,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import Cells from "./cells";
import { CalendarContext } from ".";
import { pt } from "date-fns/locale";
import * as _ from "lodash";

interface Props {
  id?: string;
}

const Yearly: React.FC<Props> = (props: Props) => {
  const { id } = props;
  const { currentDate, width } = useContext(CalendarContext);

  const getMonths = (): void => {
    const data = new Array<Date>();
    const initCal = startOfDay(startOfYear(currentDate));
    const endCal = startOfDay(startOfMonth(endOfYear(initCal)));

    let i: Date = initCal;
    while (differenceInMonths(i, endCal) <= 0) {
      data.push(i);
      i = addMonths(i, 1);
    }
    setDataArray(data.map((item) => <Cells day={item} />));
  };

  const getMonthName = () => {
    const data = new Array<string>();
    const initCal = startOfDay(startOfYear(currentDate));
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
    return data;
  };

  const [dataArray, setDataArray] = useState<Array<ReactElement>>([]);

  useEffect(() => {
    getMonths();
  }, [currentDate]);

  const monthsArray = getMonthName().map((item) => (
    <Typography align="center">{item}</Typography>
  ));

  return (
    <div>
      <Table id={id} header={monthsArray} data={dataArray} />
    </div>
  );
};

export default Yearly;
