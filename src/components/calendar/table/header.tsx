import React, { ReactElement, useContext } from "react";
import { Grid } from "@mui/material";
import { useStyles } from "../style";
import { CalendarContext } from "..";

interface Props {
  header: Array<ReactElement>;
}

const TableHeader: React.FC<Props> = (props: Props) => {
  const { header } = props;
  const { lineColor } = useContext(CalendarContext);
  const classes = useStyles();

  return (
    <Grid container>
      {header.map((itemObject: ReactElement, index: number) => (
        <Grid item xs key={`header_${index}`}>
          <div
            className={classes.headercell}
            style={{ borderColor: lineColor }}
          >
            {itemObject}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableHeader;
