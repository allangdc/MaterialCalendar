import React, { ReactChildren, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { isSameDay, startOfToday } from "date-fns";
import { CalendarContext } from "..";

interface Props {
  id?: string;
  children?: ReactChildren;
  day: Date;
}

const MonthlyCells: React.FC<Props> = (props: Props) => {
  const { children, day } = props;
  const { currentDate } = useContext(CalendarContext);
  const today = startOfToday();

  const colorCells = (): string | undefined => {
    if (isSameDay(day, today)) {
      return "#F8AD63";
    }
    if (day.getDay() === 0 || day.getDay() === 6) {
      return "#F7F6F3";
    }
    return undefined;
  };

  const colorText = (): string | undefined => {
    if (day.getMonth() !== currentDate.getMonth()) {
      return "ThreeDHighlight";
    }
    return "gray";
  };

  return (
    <Grid container style={{ backgroundColor: colorCells(), minHeight: 50 }}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          align="right"
          color="ThreeDHighlight"
          style={{ padding: 5, color: colorText() }}
        >
          {day.getDate()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default MonthlyCells;
