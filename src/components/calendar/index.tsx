import React from "react";
import Table from "./table";

interface Props {
  id?: string;
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const Calendar: React.FC<Props> = (props: Props) => {
  const { id } = props;
  return (
    <div id={id}>
      <Table
        header={[
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sabado",
          "Domingo",
        ]}
        data={data}
      />
    </div>
  );
};

export default Calendar;
