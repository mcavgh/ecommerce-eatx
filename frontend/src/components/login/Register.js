import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

function Register(props) {

    const classes = useStyles();

    const [name, setName] = useState('nombre');
    const [surname, setSurname] = useState('apellido');
    const [email, setEmail] = useState('email');
    const [contraseña, setPassword] = useState('contraseña');
    const [errorName, setErrorName] = useState('@');
    const [errorSurname, setErrorSurname] = useState('0');
    const [errorEmail, setErrorEmail] = useState('@');
    const [errorPassword, setErrorPassword] = useState('0');

    const dataUserLogin = {
        name: name,
        surname: surname,
        email: email,
        contraseña: contraseña
    }

    function validateName(value) {
    if(!/[aA-zZ].{4,}$/.test(value)) {
          setErrorName("0");
        } else {
          setErrorName('');
        }
        setName(value);
      }
    function validateSurname(value) {
        if(!/[aA-zZ].{4,}$/.test(value)) {
          setErrorSurname("0");
        } else {
          setErrorSurname('');
        }
        setSurname(value);
      }
    function validateEmail(value) {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          setErrorEmail("@");
        } else {
          setErrorEmail('');
        }
        setEmail(value);
      }
    function validatePassword(value) {
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
          setErrorPassword("@");
        } else {
          setErrorPassword('');
        }
        setPassword(value);
      }

    const getDataRegister = () => {
      if(errorName||errorSurname||errorEmail||errorPassword){
        alert('Intente completar correctamente los campos.')
      }
    }

    return (
        <div >
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <div >
                        <FormControl>
                            <div>
                            <InputLabel htmlFor="component-simple">Name</InputLabel>
                            <Input onChange={e=>validateName(e.target.value)}/>
                            {!errorName ? <CheckIcon/> : <span>{<CloseIcon/>}</span>}
                            </div>
                        </FormControl>
                        {!errorName ? null : <span>Completa el campo con tu nombre</span>}
                    </div>
                    <div >
                        <FormControl>
                            <div>
                                <InputLabel htmlFor="component-simple">Surname</InputLabel>
                                <Input onChange={e=>validateSurname(e.target.value)} />
                                {!errorSurname ? <CheckIcon/> : <span>{<CloseIcon/>}</span>}
                            </div>
                        </FormControl>
                        {!errorSurname ? null : <span>Completa el campo con tu apellido</span>}
                    </div>
                    <div >
                    <FormControl>
                        <div>
                        <InputLabel htmlFor="component-simple">e-mail</InputLabel>
                        <Input onChange={e=>validateEmail(e.target.value)}/>
                        {!errorEmail ? <CheckIcon/> : <span>{<CloseIcon/>}</span>}
                        </div>
                    </FormControl>
                        {!errorEmail ? null : <span>Completa el campo con un email valido</span>}
                    </div>
                    <div >
                    <FormControl>
                        <div>
                        <InputLabel type='password' htmlFor="component-simple">Password</InputLabel>
                        <Input type='password' onChange={e=>validatePassword(e.target.value)}/>
                        {!errorPassword ? <CheckIcon/> : <span>{<CloseIcon/>}</span>}
                        </div>
                    </FormControl>
                        {!errorPassword ? null : <span>La contraseña debe tener 8 caracteres, algun numero y alguna mayuscula</span>}
                    </div>
                </div>
                <Button onClick={()=>{getDataRegister()}}>
                    Register
                </Button> 
            </form>
        </div>
    );
}

export default Register;