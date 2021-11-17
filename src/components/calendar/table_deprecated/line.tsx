import React, { ReactNode } from "react";
import { Grid } from "@mui/material";

export type TLine = Array<ReactNode>;

interface LineProps {
  id: string;
  columns: TLine;
}

const Line: React.FC<LineProps> = (props: LineProps) => {
  const { id, columns } = props;

  return (
    <Grid container id={id}>
      {columns.map((block, index) => (
        <Grid item xs key={`column_id${id}_idx${index}`}>
          {/* <div className={classes.cell} style={{ borderColor: lineColor }}> */}
          {block}
          {/* </div> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default Line;
