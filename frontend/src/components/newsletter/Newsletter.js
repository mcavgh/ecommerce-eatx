import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './newsletter.css';
import emailjs from 'emailjs-com';
import { Typography, Input, Button } from '@material-ui/core';
import { useSelector } from "react-redux";

const Newsletter = () => {
    const userId = useSelector(state => state.userReducer.userId)

  

    const suscribeUser = (userId) => {
        axios.post(`/newsletter/user/${userId.id}`)
            .then( (msg)=> {
                if (msg.data === "is in db") {
                    Swal.fire({ icon: 'success', title: 'Exito', text: 'Ya esta suscripto!' })
                } else {
                    Swal.fire({ icon: 'success', title: 'Exito', text: 'Se ha suscripto correctamente!' })
                
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='--Newsletter-main-head'>
            <div className='--Newsletter-main'>
                <form className="--Newsletter-form" >
                    <Typography
                        variant="h3">Unite a nuestra Newsletter y enterate de los ultimos descuentos!</Typography>
                    {userId && userId.access ? (
                        <div className="--NewsletterButton">
                            <Button
                                onClick={() => suscribeUser(userId)}
                            >Suscribe</Button>
                        </div>
                    ) : ("")}
                </form>
            </div>
        </div>

    )
};

export default Newsletter;