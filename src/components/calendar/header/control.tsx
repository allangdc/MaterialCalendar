import React, { useContext, useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { addMonths, addYears, format, subMonths } from "date-fns";
import subYears from "date-fns/subYears";
import { CalendarContext, CalendarFormat } from "..";
import { useStyles } from "../style";
import { pt } from "date-fns/locale";
import * as _ from "lodash";

const Control: React.FC = () => {
  const { currDate, setCurrDate, formatCal } = useContext(CalendarContext);
  const [headerTitle, setHeaderTitle] = useState<string>();
  const classes = useStyles();

  useEffect(() => {
    if (formatCal === CalendarFormat.MONTHLY) {
      setHeaderTitle(
        _.capitalize(format(currDate, "LLLL yyyy", { locale: pt }))
      );
    } else {
      setHeaderTitle(currDate.getFullYear().toString());
    }
  }, [currDate, formatCal]);

  const GoBack = (): void => {
    if (formatCal === CalendarFormat.MONTHLY) {
      setCurrDate(subMonths(currDate, 1));
    } else {
      setCurrDate(subYears(currDate, 1));
    }
  };

  const GoForward = (): void => {
    if (formatCal === CalendarFormat.MONTHLY) {
      setCurrDate(addMonths(currDate, 1));
    } else {
      setCurrDate(addYears(currDate, 1));
    }
  };

  return (
    <Grid container>
      <Grid item xs className={classes.header_back_button}>
        <IconButton
          data-testid="btn-back"
          color="primary"
          size="small"
          aria-label="back the date for calrndar"
          onClick={GoBack}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h6" align="center" data-testid="HeaderTitle">
          {headerTitle}
        </Typography>
      </Grid>
      <Grid item xs className={classes.header_foward_button}>
        <IconButton
          data-testid="btn-forward"
          color="primary"
          size="small"
          aria-label="forward the date for calendar"
          onClick={GoForward}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Control;
