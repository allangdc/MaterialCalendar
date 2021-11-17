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
  const NCol = () => header.length;
  const [lineKey, setLineKey] = useState<Array<number>>(
    Array.from(Array(NCol()).keys())
  );

  useEffect(() => {
    const col = NCol();
    if (col > 0) {
      setLineKey(Array.from(Array(col).keys()));
    }
  }, [header.length]);

  return (
    <>
      {lineKey?.map((i) => (
        <tbody key={`tab_tbodylin_${i}`}>
          <tr key={`tab_lin_${i}`}>
            {data
              .filter(
                (value, index) =>
                  index >= i * NCol() && index < (i + 1) * NCol()
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
