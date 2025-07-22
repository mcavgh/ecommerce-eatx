import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: "140px",
    flexDirection: 'row',
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('md')]: {
      minHeight: "120px",
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
      minHeight: "auto",
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
      padding: theme.spacing(1, 0),
    },
  },
  container: {
    padding: theme.spacing(1),
    maxWidth: "1200px",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
  photo: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    [theme.breakpoints.down('md')]: {
      maxHeight: "100px",
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: "150px",
      maxHeight: "80px",
      margin: '0 auto',
    },
  },
  total: {
    float: "right",
    paddingBottom: "0px",
    background: "white",
    [theme.breakpoints.down('sm')]: {
      float: "none",
      textAlign: 'center',
    },
  },
  input: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginTop: 4,
    },
  },
  content: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    [theme.breakpoints.down('sm')]: {
      marginTop: 4,
    },
  },
  summaryCard: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  emptyCartMessage: {
    textAlign: 'center',
    margin: theme.spacing(4),
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      margin: theme.spacing(2),
    },
  },
  countContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    fontSize: '0.8rem',
  },
  removeButton: {
    fontSize: '0.75rem',
    padding: theme.spacing(0.5, 1),
    marginTop: theme.spacing(0.5),
  },
}));