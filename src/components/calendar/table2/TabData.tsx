/* eslint-disable new-cap */
import React, { ReactNode, useEffect, useState } from "react";
import { useStyles } from "../style";

interface Props {
  header: Array<ReactNode>;
  lineColor?: string;
  data: Array<ReactNode>;
  sameWidthP100: string | undefined;
}

const TabData: React.FC<Props> = (props: Props) => {
  const { header, lineColor, data, sameWidthP100 } = props;
  const classes = useStyles();
  const [lineKey, setLineKey] = useState<Array<number>>(
    Array.from(Array(7).keys())
  );
  const [ncol, setNCol] = useState<number>(7);

  useEffect(() => {
    if (header.length > 0) {
      setNCol(header.length);
    }
  }, [data.length, header.length]);

  useEffect(() => {
    console.log("NCOL", ncol);
    setLineKey(Array.from(Array(ncol).keys()));
  }, [ncol]);

  useEffect(() => {
    console.log(lineKey);
  }, [lineKey]);

  return (
    <>
      {lineKey?.map((i) => (
        <tbody key={`tab_tbodylin_${i}`}>
          <tr key={`tab_lin_${i}`}>
            {data
              .filter(
                (value, index) => index >= i * ncol && index < (i + 1) * ncol
              )
              ?.map((item, index) => (
                <td
                  className={classes.table_cell}
                  style={{ width: sameWidthP100, borderColor: lineColor }}
                  key={`tab_cell_l${i}_${index}`}
                >
                  {item}
                </td>
              ))}
          </tr>
        </tbody>
      ))}
    </>
  );
};

export default TabData;
