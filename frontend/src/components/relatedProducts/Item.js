import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, IconButton, CardActionArea, CardContent, CardMedia, Typography, Box, Chip } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { addToCart } from '../../store/cart/cart.actions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from "react-redux"
import { addToWishList, deleteFromWishList } from '../../store/user/user.action';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        transition: 'transform 0.3s, box-shadow 0.3s',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
        },
    },
    media: {
        height: 220,
        backgroundSize: 'cover',
        transition: 'transform 0.5s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    content: {
        padding: theme.spacing(2),
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    originalPrice: {
        textDecoration: 'line-through',
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1),
    },
    currentPrice: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
    },
    discountChip: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: theme.spacing(1),
        height: 24,
    },
    actionArea: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
    },
    iconButton: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: 'white',
        },
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 4,
        '&:hover': {
            backgroundColor: theme.palette.error.light,
            color: 'white',
        },
    },
    productTitle: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        height: 48,
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-line-clamp': 2,
        '-webkit-box-orient': 'vertical',
    },
}));

export default function ImgMediaCard({ product, wishlist }) {
    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userReducer.userId.id)

    return (
        <Card className={classes.root}>
            {wishlist && (
                <IconButton 
                    className={classes.closeButton} 
                    size="small"
                    onClick={() => dispatch(deleteFromWishList(product))}
                    aria-label="remove from wishlist"
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
            
            <CardActionArea onClick={() => history.push("/product/" + product.id)}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt={product.name || "Product image"}
                    image={product.img}
                />
            </CardActionArea>
            
            <CardContent className={classes.content}>
                {/* Título del producto - Añadido */}
                <Typography className={classes.productTitle} variant="subtitle1" component="h3">
                    {product.name || "Product Name"}
                </Typography>
                
                <Box className={classes.priceContainer}>
                    {product.discount && product.discount > 0 && (
                        <Typography variant="body2" className={classes.originalPrice}>
                            ${product.price}
                        </Typography>
                    )}
                    
                    <Typography className={classes.currentPrice} variant="h6" component="span">
                        ${Math.round(product.price - product.price * (product.discount / 100))}
                    </Typography>
                    
                    {product.discount && product.discount > 0 && (
                        <Chip 
                            label={`${product.discount}% OFF`} 
                            size="small" 
                            className={classes.discountChip}
                        />
                    )}
                </Box>
                
                <Box className={classes.actionArea}>
                    <IconButton 
                        className={classes.iconButton}
                        onClick={() => dispatch(addToCart(product))}
                        color="primary" 
                        aria-label="add to shopping cart"
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                    
                    {userId && (
                        <IconButton 
                            className={classes.iconButton}
                            onClick={() => dispatch(addToWishList(product))}
                            color="primary" 
                            aria-label="add to wishlist"
                        >
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

