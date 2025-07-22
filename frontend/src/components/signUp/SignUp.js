import React, { useState} from 'react';
import app from '../../firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import {useDispatch} from "react-redux"
import { postUser } from '../../store/user/user.action';

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ec-webft11-g10.vercel.app/">
        EATX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7),
    borderRadius:"30px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: '30px',
    padding: '12px',
    transition: 'background 0.2s, transform 0.2s',
    background: 'linear-gradient(100deg, rgba(242,113,33,1) 0%, rgba(233,64,87,1) 65%, rgba(138,35,135,1) 100%)',
    '&:hover': {
        transition: 'background 0.2s, transform 0.2s',
        background: 'linear-gradient(100deg, rgba(241,124,52,1) 0%, rgba(230,90,109,1) 65%, rgba(136,51,134,1) 100%)',
        transform: 'scale(1.05)'
    },
    color: theme.palette.background.paper,
    },
}));

export default function SignUp() {
   const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const handleClickSignUp = async (e) => {
    e.preventDefault();
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(input.email, input.password)
        .then(({user})=>{dispatch(postUser(input.firstName+input.lastName, input.email,user.uuid))})
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }

  const [input, setInput] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear cuenta
        </Typography>
        <form className={classes.form} noValidate
          onSubmit={(e) => handleClickSignUp(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="standard"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}

              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Quiero recibir promos y actualizaciones via email."
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleClickSignUp}

            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Crear cuenta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
             
              <Typography to="/login" component={Link}  variant="body2">
                                Ya tengo una cuenta. Iniciar sesión.
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}