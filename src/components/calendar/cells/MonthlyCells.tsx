import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { isSameDay, isToday } from "date-fns";
import { CalendarContext, CalendarHoliday } from "..";

interface Props {
  id?: string;
  children?: ReactNode;
  day: Date;
}

const MonthlyCells: React.FC<Props> = (props: Props) => {
  const { children, day } = props;
  const { currentDate, holidays, holidayColor } = useContext(CalendarContext);
  const [myHoly, setMyHoly] = useState<CalendarHoliday>();

  useEffect(() => {
    const holy = holidays?.find((dayHoly) => {
      if (isSameDay(dayHoly.day, day)) {
        return true;
      }
      if (dayHoly.yearly) {
        const tempHoly = new Date(dayHoly.day);
        tempHoly.setFullYear(day.getFullYear());
        if (isSameDay(tempHoly, day)) {
          return true;
        }
      }
      return false;
    });
    setMyHoly(holy);
  }, [holidays, day]);

  const colorCells = (): string | undefined => {
    if (isToday(day)) {
      return "#F8AD63";
    }
    if (myHoly) {
      return holidayColor || "#FECEF1";
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

  const HolidayInfo: React.FC = () => {
    return (
      <div style={{ position: "relative" }}>
        <Typography
          align="center"
          variant="subtitle2"
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {myHoly && <>{myHoly?.title}</>}
        </Typography>
      </div>
    );
  };

  return (
    <Grid
      container
      data-testid="MonthlyView"
      style={{
        backgroundColor: colorCells(),
        height: "100%",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          align="right"
          style={{ padding: 5, color: colorText() }}
        >
          {day.getDate()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <HolidayInfo />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default MonthlyCells;
