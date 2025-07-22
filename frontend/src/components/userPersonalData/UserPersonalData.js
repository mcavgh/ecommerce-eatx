import React from 'react';
import { Divider, Avatar, Grid, Paper, IconButton } from "@material-ui/core";
import UserAvatar from "../userAvatar/UserAvatar"

const UserPersonalData = ({ userData }) => {
    let date = new Date(userData.createdAt)

    return (
        <Grid container>
            <Grid
                container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
                xs={12} sm={6}
            >
                <Grid item>
                    <Avatar alt="Avatar" src={userData.photoURL} style={{ width: "300px", height: "300px"}} />
                </Grid>
                <Grid item>
                    <h3>Cambia tu imagen de perfil:</h3>
                </Grid>
                <Grid item>
                    <UserAvatar id={userData.id}/>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={2}
                direction="column"
                xs={12} sm={6}
                >
                    <Grid item>
                        <h1>{`${userData.name} ${userData.surname}`}</h1>
                    </Grid>
                    <Divider/>
                    <Grid item>
                        <h3>Tipo de usuario: {userData.access}</h3>
                    </Grid>
                    <Grid item>
                        <h3>Correo electronico: {userData.email}</h3>
                    </Grid>
                    <Grid item>
                        <h3>Miembro desde: {String(date)}</h3>
                    </Grid>
            </Grid>
        </Grid>
    )
}

export default UserPersonalData
