import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  headercell: {
    border: "solid",
    borderWidth: 1,
    minHeight: 24,
  },
  cell: {
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
  table_cell: {
    verticalAlign: "top",
    border: "solid 1px lightgrey",
  },
  table: {
    width: "100%",
    height: "100%",
    borderCollapse: "collapse",
  },
});
