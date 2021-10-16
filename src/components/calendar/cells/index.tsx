import React, { ReactChildren, useContext } from "react";
import { CalendarContext, CalendarFormat } from "..";
import MonthlyCells from "./MonthlyCells";
import YearlyCells from "./YearlyCells";

interface Props {
  id?: string;
  children?: ReactChildren;
  day: Date;
}

const Cells: React.FC<Props> = (props: Props) => {
  const { children, day } = props;
  const { formatCal } = useContext(CalendarContext);

  return (
    <div>
      {formatCal === CalendarFormat.MONTHLY ? (
        <MonthlyCells day={day}>{children}</MonthlyCells>
      ) : (
        <YearlyCells day={day}>{children}</YearlyCells>
      )}
    </div>
  );
};

export default Cells;
