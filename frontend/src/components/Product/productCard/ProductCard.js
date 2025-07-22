import React from 'react';
import { useHistory } from 'react-router';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography, useTheme } from '@material-ui/core';
import { useStyles } from './styles'
import defaultImg from './default.png'
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from '../../../store/cart/cart.actions';
import { addToWishList } from '../../../store/user/user.action';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';




export default function ProductCard({ stock, id, img, name, description, price, discount }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const product = { stock, id, img, name, description, price, discount }
  const userId = useSelector(state => state.userReducer.userId.id)

  return (
    <Grid className={classes.paper}>
      <CardActionArea onClick={() => history.push(`/product/${id}`)} className={classes.action}>
        <CardMedia
          component="img"
          alt="Food"
          height="140"
          image={img === "no tiene" ? defaultImg : img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {!name ? 'Some food' : name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {!description ? 'Food is great to eat, it makes you healthy! Sometimes...' : description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        <div>
          {discount && discount > 0 ? <strike>${price}</strike> : ""
          }
        </div>
        <div>
          <Typography display="inline" gutterBottom variant="h5" component="h2">
            ${Math.round(price - price * (discount / 100))}&nbsp;
          </Typography>
          <Typography component="h4" display="inline" color="primary">
            &nbsp;{discount && discount > 0 ? (<span>{discount}%OFF</span>) : ("")}
          </Typography>
          <IconButton onClick={() => dispatch(addToCart(product))}
            color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon fontSize="large" className={classes.buy} />
          </IconButton>
          {userId && <IconButton className={classes.noPadding} onClick={() => dispatch(addToWishList(product))}
            color="primary" aria-label="add to shopping cart">
            <FavoriteBorderIcon fontSize="large" className={classes.buy} />
          </IconButton>}
        </div>

      </CardContent>
    </Grid>
  );
}