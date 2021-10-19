import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import { isSameMonth, startOfToday } from "date-fns";

interface Props {
  id?: string;
  children?: ReactNode;
  day: Date;
}

const YearlyCells: React.FC<Props> = (props: Props) => {
  const { children, day } = props;
  const currentDate = startOfToday();

  const colorCells = (): string | undefined => {
    if (isSameMonth(day, currentDate)) {
      return "#F8AD63";
    }
    return undefined;
  };

  return (
    <Grid
      container
      id="YearlyView"
      style={{ backgroundColor: colorCells(), minHeight: 50 }}
    >
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default YearlyCells;
