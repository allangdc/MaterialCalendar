import { Grid } from "@mui/material";
import React, { ReactNode } from "react";
import TableData from "./data";
import TableHeader from "./header";

interface Props {
  id?: string;
  header: Array<ReactNode>;
  data: Array<ReactNode>;
}

const TableMe: React.FC<Props> = (props: Props) => {
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

export default TableMe;
