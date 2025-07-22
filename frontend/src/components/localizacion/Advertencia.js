import { ListItem, ListItemText } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"


export function Advertencia() {
    return (
        <div>
            <div>
                <h1>USTED ESTA DEMASIADO LEJOS PARA UTILIZAR ESTE SERVICIO</h1>
            </div>
            <div>
                <ListItem button to="/" component={Link}>
                    <ListItemText primary="Volver a Home" />
                </ListItem>
            </div>
        </div>
    )
}