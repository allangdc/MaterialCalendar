import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useContext } from "react";
import { CalendarContext, CalendarFormat } from "..";

const ToggleCalendarFormat: React.FC = () => {
  const { formatCal, setFormatCal } = useContext(CalendarContext);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormat: CalendarFormat
  ) => {
    setFormatCal(newFormat);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <ToggleButtonGroup
        value={formatCal}
        onChange={handleFormat}
        exclusive
        style={{ height: 30 }}
      >
        <ToggleButton data-testid="toggle-month" value={CalendarFormat.MONTHLY}>
          Mês
        </ToggleButton>
        <ToggleButton data-testid="toggle-year" value={CalendarFormat.YEARLY}>
          Ano
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleCalendarFormat;
