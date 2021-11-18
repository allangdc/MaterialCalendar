import { makeStyles } from "@material-ui/styles";

const radius = 15;

export const useStyles = makeStyles({
  initbar: {
    backgroundColor: "red",
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    "&#init": {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
    },
    "&#end": {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    },
  },
  contentText: {
    marginLeft: 10,
  },
});
