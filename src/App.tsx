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
    <Calendar />
    <h1>Footer</h1>
    <Button variant="contained">Enter</Button>
  </div>
);

export default App;
