import { Grid, Typography } from "@mui/material";
import React, { ReactElement } from "react";

interface Props {
  id?: string;
  header: Array<string>;
  data: Array<number>;
}

const Table: React.FC<Props> = (props: Props) => {
  const { id, header, data } = props;
  const ncols = header.length;
  let line: Array<ReactElement> = new Array<ReactElement>();
  const lines = new Array<ReactElement>();

  while (data.length % ncols !== 0) {
    data.push(-1);
  }

  data.map((item: number, index: number) => {
    line.push(
      <Grid item xs key={`line_${index}`}>
        <Typography
          textAlign="center"
          style={{
            backgroundColor: "red",
            border: "solid",
            borderWidth: 1,
          }}
        >
          {item}
        </Typography>
      </Grid>
    );
    if (index % ncols === ncols - 1) {
      lines.push(
        <Grid container spacing={1} item xs={12} key={`lines_${lines.length}`}>
          {line}
        </Grid>
      );
      line = new Array<ReactElement>();
    }
  });

  return (
    <Grid container id={id}>
      <Grid container spacing={1} item xs={12}>
        {header.map((item: string, index: number) => (
          <Grid item xs key={`header_${index}`}>
            <Typography
              textAlign="center"
              style={{
                backgroundColor: "red",
                border: "solid",
                borderWidth: 1,
              }}
            >
              {item}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {lines}
    </Grid>
  );
};

export default Table;
