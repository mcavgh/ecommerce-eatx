import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme)=>({
    root: {
        background: 'linear-gradient(45deg, #6b90fe5e 0%, #ff53d000 100%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        margin: '10px',
        textTransform: 'capitalize',
        
      },
      label: {
      },
      container:{
        position: "relative",
        maxWidth: "20vh",
        width: "10%",
        height: "10vh",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-center",
        alignItems: "flex-center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0px",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px var(--green-primary)",
        WebkitBoxReflect: "below 0 linear-gradient(transparent 95%, white)",
        marginBottom: "0px"
    },
    button:{      
      position: "relative",
      bottom: "20%",
      right: "5%",
      cursor: "pointer",
      height: "30px",
      width: "120px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
      
  }
}))