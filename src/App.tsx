import React from "react";
import { Button } from "@mui/material";
import Calendar from "./components/calendar";

/**
 * Initial Class
 * @return {React.FC} Render the page.
 */
const App: React.FC = () => (
  <div>
    <h1>Header</h1>
    <Calendar
      language="pt-BR"
      holidays={[
        {
          day: new Date(2021, 10, 7),
          title: "Meu Feriado",
          yearly: false,
        },
        { day: new Date(1984, 11, 25), title: "Natal", yearly: true },
        { day: new Date(1984, 0, 1), title: "Ano Novo", yearly: true },
      ]}
    />
    <h1>Footer</h1>
    <Button variant="contained">Enter</Button>
  </div>
);

export default App;
