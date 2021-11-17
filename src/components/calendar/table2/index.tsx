/* eslint-disable new-cap */
import React, { ReactNode } from "react";
import { useStyles } from "../style";
import TabData from "./TabData";
import TabHeader from "./TabHeader";

interface TableProps {
  className?: string;
  children: ReactNode;
}
const MyTable: React.FC<TableProps> = (props: TableProps) => {
  const { children } = props;
  return <table {...props}>{children}</table>;
};

interface Props {
  header: Array<ReactNode>;
  data: Array<ReactNode>;
  lineColor?: string;
  sameWidthP100: string | undefined;
}

const TableCalendar2: React.FC<Props> = (props: Props) => {
  const { header, data, lineColor, sameWidthP100 } = props;
  const classes = useStyles();

  return (
    <MyTable className={classes.table}>
      <TabHeader
        header={header}
        lineColor={lineColor}
        sameWidthP100={sameWidthP100}
      />
      <TabData header={header} data={data} sameWidthP100={sameWidthP100} />
    </MyTable>
  );
};

export default TableCalendar2;
