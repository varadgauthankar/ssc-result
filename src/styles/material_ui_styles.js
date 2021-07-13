import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 220,
  },

  root: {
    // width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "12px",
    paddingBottom: "100px",
  },

  boxResult: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    // minHeight: "100vh",
    paddingTop: "10px",
  },

  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },

  subTitle: {
    fontSize: "16px",
    color: "grey",
  },

  table: {
    padding: "12px",
  },

  tableCont: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 500,
    border: "1px solid #000000",
    borderRadius: "8px",
    // padding: "12px",
  },
}));
