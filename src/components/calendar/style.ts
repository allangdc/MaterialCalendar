import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  headercell: {
    border: "solid",
    borderWidth: 1,
    minHeight: 24,
  },
  cell: {
    border: "solid",
    borderWidth: "0.01px",
    height: "100%",
  },
  header_back_button: {
    display: "flex",
    justifyContent: "end",
  },
  header_foward_button: {
    display: "flex",
    justifyContent: "start",
  },
});
