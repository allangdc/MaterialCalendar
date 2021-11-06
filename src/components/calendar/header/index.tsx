import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import { CalendarContext } from "..";
import Control from "./control";
import ToggleCalendarFormat from "./ToggleCalendarFormat";
import { startOfToday } from "date-fns";

const Header: React.FC = () => {
  const { width } = useContext(CalendarContext);

  return (
    <Grid
      container
      spacing={1}
      id={width && width > 450 ? "normal-header" : "mobile-header"}
    >
      {width && width > 450 ? <NormalHeader /> : <MobileHeader />}
    </Grid>
  );
};

const TodayButton: React.FC = () => {
  const { setCurrDate } = useContext(CalendarContext);

  const handleClick = (): void => {
    setCurrDate(startOfToday());
  };

  return (
    <Button
      data-testid="btn-today"
      variant="outlined"
      onClick={handleClick}
      style={{ height: 30 }}
    >
      Hoje
    </Button>
  );
};

const NormalHeader: React.FC = () => (
  <>
    <Grid item xs>
      <TodayButton />
    </Grid>
    <Grid item xs />
    <Grid item xs={6}>
      <Control />
    </Grid>
    <Grid item xs />
    <Grid item xs>
      <ToggleCalendarFormat />
    </Grid>
  </>
);

const MobileHeader: React.FC = () => (
  <>
    <Grid item xs={12}>
      <Control />
    </Grid>
    <Grid item xs>
      <TodayButton />
    </Grid>
    <Grid item xs>
      <ToggleCalendarFormat />
    </Grid>
  </>
);

export default Header;
