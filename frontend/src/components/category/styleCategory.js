import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({

  loader: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  root: {
    // position: 'relative',
    // display: 'contents',
  },
  gridList: {
    justifyContent: "center",
    flexWrap: 'wrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button: {

  }
}));