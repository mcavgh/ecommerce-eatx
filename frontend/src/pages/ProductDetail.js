import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { Grid, Typography, Divider, Button, Box } from '@material-ui/core/';
import { useStyles } from '../components/product/styles'
import AppBar from '../components/appBar/AppBar'
import { getOneProduct } from '../store/product/product.actions';
import { Cart } from '../components/product/cart/Cart';
import { addToCart } from '../store/user/user.action';

export default function Product() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams()
    const product = useSelector(state => state.productReducer?.oneProduct)

    useEffect(() => {
        dispatch(getOneProduct(id))
    }, [dispatch])

    const { name, description, price, stock, img } = product

    return (
        <>
            <AppBar />
            { name && name.length === 0 ? <h1>Cargando...</h1> :
                <Grid container spacing={1} className={classes.container} >
                    <Grid item xs={12} sm={6}>
                        <img src={img} alt='Food' className={classes.media} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction='column' className={classes.info}>
                            <Box mt={2}>
                                <Typography variant='h4'>{name}</Typography>
                                <Divider />
                                <Typography variant='subtitle1'>{description}</Typography>
                                <Typography variant='h5'>${price}</Typography>
                                {stock > 0 ? (<Typography variant='h6'>Hay Stock({stock})</Typography>)
                                    : (<h2>no hay stock</h2>)
                                }
                            </Box>
                            <Button variant='contained' color='primary' className={classes.button}>Purchase</Button>
                            <Cart product={product}/>
                            <Button onClick={()=>dispatch(addToCart(product))}variant='contained' color='primary' className={classes.button}>add to cart</Button>


                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    );
}