import { fade, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
    root: {
        display: 'flex',
    },
    appBar: {
        background: theme.palette.background.paper,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        //marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
        padding:"0"
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        color: theme.palette.primary.main,
    },
    barOptions:{
        textAlign: 'center',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0,2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    icons: {
        margin:"0",
        padding:"0",
        color: theme.palette.primary.main,
    },
    content: {
        flexGrow: 1,
        padding: '0',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        minWidth:"100px"
    },
    searchIcon: {
        padding: theme.spacing(0, 2.5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
    cart:{
        display:"none",
    },
    inputRoot: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        border: '3.8px solid #f27121',
        borderRadius: '30px',
        padding: '2.8px',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
        },
    },
    sectionDesktop: {
        fontSize:"large",
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // Agregar estos estilos al objeto useStyles
    logoButton: {
      textTransform: 'none',
      padding: theme.spacing(1, 2),
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.05)',
      },
    },
    logoContainer: {
      position: 'relative',
      marginRight: theme.spacing(1),
      animation: '$bounce 2s infinite',
    },
    pizzaIcon: {
      color: '#FF6B35',
      transform: 'rotate(-15deg)',
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
      animation: '$spin 4s linear infinite',
    },
    forkIcon: {
      color: '#FFD23F',
      position: 'absolute',
      right: '-8px',
      top: '50%',
      transform: 'translateY(-50%) rotate(25deg)',
      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
    },
    logoText: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #FF6B35 30%, #FFD23F 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      letterSpacing: '2px',
    },
    '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': {
        transform: 'translateY(0)',
      },
      '40%': {
        transform: 'translateY(-5px)',
      },
      '60%': {
        transform: 'translateY(-3px)',
      },
    },
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(-15deg)',
      },
      '50%': {
        transform: 'rotate(-5deg)',
      },
      '100%': {
        transform: 'rotate(-15deg)',
      },
    },
}));