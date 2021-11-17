/* eslint-disable new-cap */
/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import { CalendarContext } from ".";
import TableCalendar2 from "./table2";

const Monthly: React.FC = () => {
  const { headerArray, dataArray, sameWidthP100 } = useContext(CalendarContext);

  return (
    <TableCalendar2
      header={headerArray}
      data={dataArray}
      sameWidthP100={sameWidthP100}
    />
  );
  // return <TableMe header={headerArray} data={dataArray} />;
};

export default Monthly;
