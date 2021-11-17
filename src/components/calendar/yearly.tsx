/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import { CalendarContext } from ".";
import TableCalendar2 from "./table2";

const Yearly: React.FC = () => {
  const { sameWidthP100, headerArray, dataArray } = useContext(CalendarContext);

  return (
    <TableCalendar2
      header={headerArray}
      data={dataArray}
      sameWidthP100={sameWidthP100}
    />
  );
};

export default Yearly;
