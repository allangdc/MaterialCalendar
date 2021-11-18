import { Grid, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";

export enum BarType {
  INIT = "initBar",
  MID = "midBar",
  END = "endBar",
}

interface Props {
  barType: BarType;
  text?: string;
}

const Bar: React.FC<Props> = (props: Props) => {
  const { barType, text } = props;
  const classes = useStyles();

  const InitBarContent: React.FC = () => (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <div id="init" className={classes.initbar}>
          <Typography variant="subtitle2" className={classes.contentText}>
            {text}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );

  const EndBarContent: React.FC = () => (
    <Grid container>
      <Grid item xs={10}>
        <div id="end" className={classes.initbar}>
          <Typography variant="subtitle2" className={classes.contentText}>
            {text}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );

  const MidBarContent: React.FC = () => (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.initbar}>
          <Typography variant="subtitle2" className={classes.contentText}>
            {text}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <>
      {barType === BarType.INIT && <InitBarContent />}
      {barType === BarType.END && <EndBarContent />}
      {barType === BarType.MID && <MidBarContent />}
    </>
  );
};

export default Bar;
