import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //margin: "9px",//border
    minHeight: "160px",
    //borderBottom: ".1rem grey solid"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    padding: theme.spacing(2),
  },
  photo: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  total: {
    float: "right",
    paddingBottom: "0px",
    background: "white",
  },
  input: {
    marginTop: 11
  }
}));