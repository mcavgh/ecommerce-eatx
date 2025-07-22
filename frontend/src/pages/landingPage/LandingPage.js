import React from 'react';
import { useStyles } from './styleLanding';
import { CssBaseline } from '@material-ui/core';
import LogIn from '../../components/login/LoginFirebase'

function PageLogIn(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <LogIn className={classes.login}/>
        </div>
    );
}

export default PageLogIn;