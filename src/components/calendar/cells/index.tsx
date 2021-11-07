import React, { ReactNode, useContext } from "react";
import { CalendarContext, CalendarFormat } from "..";
import { useStyles } from "../style";
import MonthlyCells from "./MonthlyCells";
import YearlyCells from "./YearlyCells";

interface Props {
  id?: string;
  children?: ReactNode;
  day: Date;
}

const Cells: React.FC<Props> = (props: Props) => {
  const { children, day } = props;
  const { formatCal, lineColor } = useContext(CalendarContext);
  const classes = useStyles();

  return (
    <div
      className={classes.cell}
      style={{ borderColor: lineColor, minHeight: 50 }}
    >
      {formatCal === CalendarFormat.MONTHLY ? (
        <MonthlyCells day={day}>{children}</MonthlyCells>
      ) : (
        <YearlyCells day={day}>{children}</YearlyCells>
      )}
    </div>
  );
};

export default Cells;
