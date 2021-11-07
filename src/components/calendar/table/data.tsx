import React, { ReactElement, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Line, { TLine } from "./line";

interface Props {
  ncols: number;
  data: Array<ReactElement>;
}

const TableData: React.FC<Props> = (props: Props) => {
  const { ncols, data } = props;
  const [lines, setLines] = useState<Array<TLine>>([]);

  useEffect(() => {
    // eslint-disable-next-line new-cap
    SplitLines();
  }, [data]);

  const SplitLines = () => {
    const dt = new Array<ReactElement>(...data);
    while (dt.length % ncols !== 0) {
      dt.push(<div />);
    }

    const line: TLine = new Array<ReactElement>();
    const tempLines = new Array<TLine>();
    dt.map((item, index) => {
      line.push(item);
      if (index % ncols === ncols - 1) {
        tempLines.push(new Array(...line));
        line.length = 0;
      }
    });
    setLines(tempLines);
  };

  return (
    <Grid container>
      {lines.map((lin: TLine, index) => (
        <Grid item xs={12} key={`tablin_${index}`}>
          <Line id={`lin${index}`} columns={lin} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TableData;
