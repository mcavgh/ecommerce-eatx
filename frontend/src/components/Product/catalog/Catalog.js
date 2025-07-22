import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Grid } from '@material-ui/core/';
import { useStyles } from './styles'
import ProductCard from '../productCard/ProductCard'
import axios from "axios";
import { searchProductSuccess } from '../../../store/product/product.actions';

export default function Catalog() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const searchResults = useSelector(state => state.productReducer?.searchResults)
    const products = useSelector(state => state.productReducer?.products)
    useEffect(() => {
        axios.get(`/products/`).then(result => {
            dispatch(searchProductSuccess(result.data))
        })
    }, [dispatch])
    return (
        <div>
            <Grid container spacing={2} className={classes.container}>
                {((searchResults.length === 0) ?
                    (<h1>no hay resultados</h1>) : (searchResults.map(food => {
                        return <Grid item xs={12} sm={4} md={3}>
                            <ProductCard discount={food.discount} stock={food.stock} id={food.id} img={food.img} name={food.name} description={food.description} price={food.price}
                            /> </Grid>
                    }))
                )}
            </Grid>
        </div>
    );
}
