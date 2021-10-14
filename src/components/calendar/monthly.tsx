/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import Table from "./table";
import {
  addDays,
  endOfMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { differenceInDays, endOfWeek } from "date-fns/esm";
import Cells from "./cells";

interface Props {
  id?: string;
  currentDate: Date;
  language: string;
}

const Monthly: React.FC<Props> = (props: Props) => {
  const { id, currentDate, language } = props;
  const [width, setWidth] = useState<number | undefined>(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    setWidth(ref.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  });

  const getDays = () => {
    const data = new Array<Date>();
    const initCal = startOfDay(startOfWeek(startOfMonth(currentDate)));
    const endCal = startOfDay(endOfWeek(endOfMonth(currentDate)));

    let i: Date = initCal;
    while (differenceInDays(i, endCal) <= 0) {
      data.push(i);
      i = addDays(i, 1);
    }
    return data;
  };

  const getWeekName = () => {
    const data = new Array<string>();
    const initCal = startOfDay(startOfWeek(currentDate));
    const endCal = startOfDay(endOfWeek(initCal));

    let i: Date = initCal;
    while (differenceInDays(i, endCal) <= 0) {
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
      data.push(width && width > 500 ? longWeekname : shortWeekname);
      i = addDays(i, 1);
    }
    return data;
  };

  const daysArray = getWeekName().map((item) => (
    <Typography align="center">{item}</Typography>
  ));
  const dataArray = getDays().map((item) => <Cells day={item} />);

  return (
    <div ref={ref}>
      {width}
      <Table
        id={id}
        header={daysArray}
        data={dataArray}
        lineColor="rgb(223 223 222)"
      />
    </div>
  );
};

export default Monthly;
