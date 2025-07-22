import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL+'/C-.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: "grid",
        justifyContent: "center"
    },
}))