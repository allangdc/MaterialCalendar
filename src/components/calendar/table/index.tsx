import { Grid } from "@mui/material";
import React, { ReactElement } from "react";
import TableData from "./data";
import TableHeader from "./header";

interface Props {
  id?: string;
  header: Array<ReactElement>;
  data: Array<ReactElement>;
}

const Table: React.FC<Props> = (props: Props) => {
  const { id, header, data } = props;

  return (
    <Grid container id={id}>
      <Grid item xs={12}>
        <TableHeader header={header} />
      </Grid>
      <Grid item xs={12}>
        <TableData ncols={header.length} data={data} />
      </Grid>
    </Grid>
  );
};

export default Table;
