import React from 'react';
import { useStyles } from './styleLanding';
import SignUp from '../../components/signUp/SignUp';
import { CssBaseline } from '@material-ui/core';
function PageSignUp() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <SignUp className={classes.login}/>
        </div>
    );
}

export default PageSignUp;