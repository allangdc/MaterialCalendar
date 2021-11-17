/* eslint-disable new-cap */
import React, { ReactNode } from "react";
import { useStyles } from "../style";

interface Props {
  header: Array<ReactNode>;
  lineColor?: string;
  sameWidthP100: string | undefined;
}

const TabHeader: React.FC<Props> = (props: Props) => {
  const { header, lineColor, sameWidthP100 } = props;
  const classes = useStyles();

  return (
    <tbody>
      <tr>
        {header.map((item, index) => (
          <th
            className={classes.table_cell}
            style={{ width: sameWidthP100, borderColor: lineColor }}
            key={`tab_hdr_${index}`}
          >
            {item}
          </th>
        ))}
      </tr>
    </tbody>
  );
};

export default TabHeader;
