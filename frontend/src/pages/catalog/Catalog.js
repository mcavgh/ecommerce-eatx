// import "./catalog.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../../components/Product/productCard/ProductCard';
import FilterGeneres from './FilterGeneres';
import { Typography, Paper, Grid } from '@material-ui/core/';
import axios from "axios"
import { searchProductSuccess } from '../../store/product/product.actions';
import CatalogComponent from '../../components/category/CatalogCategory';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tilt from 'react-vanilla-tilt'

const Catalog = () => {
    const matches = useMediaQuery('(min-width:600px)');

    const dispatch = useDispatch()
    let products = useSelector(state => state.productReducer.searchResults)
    useEffect(() => {
        axios.get(`/products/`).then(result => {
            dispatch(searchProductSuccess(result.data))
        })
    }, [dispatch])

    return (
        <>
           {matches?"":<CatalogComponent/>} 
            <div className="catalog--main-row">
                {matches &&<Grid className="catalog--main-col-menu-box">
                    <Typography
                        gutterBottom variant="h5" component="h2">
                        Categorias
                               </Typography>
                    <FilterGeneres />
                </Grid>}
               
                <Grid    container
                  direction="row"
                  justify="center"
                  alignItems="center"className="grid-container">
                    {products && products.length >= 1 ? (
                        products.map((product, index) => {
                            return (
                                <Tilt key={index} item xs={12} sm={4} md={3} lg={2} xl={2} className="grid">
                                    <ProductCard
                                        key={index}
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        img={product.img}
                                        price={parseFloat(product.price)}
                                        stock={product.stock}
                                        discount={product.discount}
                                    />
                                </Tilt>
                            );
                        })
                    ) : (
                        <p>NO PRODUCTS IN DB</p>
                    )}
                </Grid>

            </div>

        </>
    );
};


export default Catalog;