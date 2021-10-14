import React from "react";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

interface Props {
  id?: string;
}

const Header: React.FC<Props> = (props: Props) => {
  const { id } = props;

  return (
    <Grid container id={id}>
      <Grid item xs={3}>
        <Button>Hoje</Button>
      </Grid>
      <Grid item xs={6}>
        <Control />
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup value="month" style={{ height: 30 }}>
          <ToggleButton value="month">Mês</ToggleButton>
          <ToggleButton value="year">Ano</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

const Control: React.FC = () => (
  <Grid container>
    <Grid item xs={2}>
      <Button>Voltar</Button>
    </Grid>
    <Grid item xs>
      <Typography variant="h5" align="center">
        MÊS
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Button>Avançar</Button>
    </Grid>
  </Grid>
);

export default Header;
