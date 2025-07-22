import {blue, red } from '@material-ui/core/colors'
import { makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      margin:"10px",
      maxWidth: 345,
      maxHeight: 400,
      border:blue,
      
    },
    container:{
      background:red,
    },
    buy:{
      color: theme.palette.primary.main,
    },
    paper:{
      backgroundpaper:theme.palette.background.paper,
    },
    noPadding: {
      padding: '0',
    },
    cardContent:{
      minHeight: 114

    }
   
}))