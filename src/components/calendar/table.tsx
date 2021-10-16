import { Grid } from "@mui/material";
import React, { ReactElement } from "react";
import { useStyles } from "./style";

interface Props {
  id?: string;
  header: Array<ReactElement>;
  data: Array<ReactElement>;
  lineColor: string;
}

const Table: React.FC<Props> = (props: Props) => {
  const { id, header, data, lineColor } = props;
  const classes = useStyles();

  const ncols = header.length;
  let line: Array<ReactElement> = new Array<ReactElement>();
  const lines = new Array<ReactElement>();

  while (data.length % ncols !== 0) {
    data.push(<div />);
  }

  data.map((item: ReactElement, index: number) => {
    line.push(
      <Grid item xs key={`line_${index}`}>
        <div className={classes.cell} style={{ borderColor: lineColor }}>
          {item}
        </div>
      </Grid>
    );
    if (index % ncols === ncols - 1) {
      lines.push(
        <Grid container item xs={12} key={`lines_${lines.length}`}>
          {line}
        </Grid>
      );
      line = new Array<ReactElement>();
    }
  });

  const Header = () => (
    <Grid container item xs={12}>
      {header.map((item: ReactElement, index: number) => (
        <Grid item xs key={`header_${index}`}>
          <div
            className={classes.headercell}
            style={{ borderColor: lineColor }}
          >
            {item}
          </div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid container id={id}>
      <Header />
      {lines}
    </Grid>
  );
};

export default Table;
