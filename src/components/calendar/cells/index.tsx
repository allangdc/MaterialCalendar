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

  const GenericCells: React.FC = () => {
    if (formatCal === CalendarFormat.MONTHLY) {
      return <MonthlyCells day={day}>{children}</MonthlyCells>;
    } else {
      return <YearlyCells day={day}>{children}</YearlyCells>;
    }
  };

  return (
    <div className={classes.cell} style={{ borderColor: lineColor }}>
      <GenericCells />
    </div>
  );
};

export default Cells;
