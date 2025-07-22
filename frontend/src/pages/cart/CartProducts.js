import React, { useEffect} from "react";
import { Card, CardContent, Typography, Grid, Button, CardMedia, Container, useMediaQuery } from "@material-ui/core/";
import {Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "../../components/appBar/AppBar";
import defaultImg from "../../components/Product/productCard/ProductCard";
import { addToCart, removeFromCart, getTotal, restToCart } from '../../store/cart/cart.actions';
import { useStyles } from './styleCart';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Swal from 'sweetalert2';
import { findOrCreateOrders } from '../../store/order/order.action';
import {FindMe} from '../../components/localizacion/Geolocalizacion'
import { useTheme } from '@material-ui/core/styles';

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);
  const userId = useSelector((state) => state.userReducer.userId.id);
  const history= useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  const handlerClick = () => {
    if (!userId){
      alert("debe registrarse");
      return history.push("/LogIn")
    } else if(localizacion > 50 ){
      return history.push("/advertencia")
    } else {
      try {
        dispatch(findOrCreateOrders(userId));
        return history.push("/PageCheckout")
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Oops...', text:'Something went wrong!', })
      }
    }
  }

  const localizacion = FindMe()

  // Función para determinar el tamaño de tipografía según el dispositivo
  const getVariant = (desktop, tablet, mobile) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  }

  return (
    <Container className={classes.container} disableGutters={isMobile}>
      <AppBar />
      {cart && cart.length > 0
        ? cart.map((product) => {
            return (
              <Card key={product.id} className={classes.root}>
                {!isMobile && <Grid item xs={1} />}
                <Grid item xs={12} sm={2} md={2}>
                  <CardMedia
                    component="img"
                    alt="Food"
                    image={
                      product.img === "no tiene" ? defaultImg : product.img
                    }
                    title={product.name}
                    className={classes.photo}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h4" variant={getVariant("h5", "h6", "subtitle1")}>
                      {product.name}
                    </Typography>
                    <Typography variant={getVariant("body2", "body2", "caption")} color="textSecondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={3} md={2} className={classes.input}>
                  <div className={classes.countContainer}>
                    <IconButton
                      onClick={() => product.count<product.stock&&dispatch(addToCart(product))}
                      color="primary"
                      aria-label="add to shopping cart"
                      size="small"
                    >
                      <AddShoppingCartIcon fontSize={getVariant("small", "small", "small")} />
                    </IconButton>
                    <Typography display="inline" component="span" variant={getVariant("body1", "body2", "body2")}>
                      {product.count}
                    </Typography>
                    <IconButton
                      onClick={() => dispatch(restToCart(product))}
                      color="primary"
                      aria-label="remove from cart"
                      size="small"
                    >
                      <RemoveShoppingCartOutlinedIcon fontSize={getVariant("small", "small", "small")} />
                    </IconButton>
                  </div>
                  <Typography component="p" variant="caption" className={classes.smallText}>
                    ({product.stock} disponibles)
                  </Typography>
                  <Button
                    color="primary"
                    onClick={() => dispatch(removeFromCart(product))}
                    size="small"
                    className={classes.removeButton}
                  >
                    eliminar del carrito
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2} md={2} className={classes.priceContainer}>
                  <Typography component="p" variant={getVariant("h6", "subtitle1", "body1")}>
                    ${Math.round(product.price-product.price*(product.discount/100))}
                  </Typography>
                </Grid>
              </Card>
            );
          })
        : ""}
      {cart && cart.length > 0 ? (
        <Card className={`${classes.root} ${classes.summaryCard}`}>
          {!isMobile && <Grid item xs={7} sm={7} md={7} />}
          <Grid item xs={12} sm={2} md={2}>
            <Typography component="p" variant={getVariant("subtitle1", "subtitle2", "body2")} align={isMobile ? "center" : "left"}>
              Subtotal
            </Typography>
            <Typography component="p" variant={getVariant("h6", "subtitle1", "body1")} style={{ marginTop: isMobile ? 8 : 16 }} align={isMobile ? "center" : "left"}>
              Total
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Typography component="p" variant={getVariant("subtitle1", "subtitle2", "body2")} align={isMobile ? "center" : "left"}>
              ${total}
            </Typography>
            <Typography component="p" variant={getVariant("h6", "subtitle1", "body1")} style={{ marginTop: isMobile ? 8 : 16 }} align={isMobile ? "center" : "left"}>
              ${total}
            </Typography>
            <div style={{ textAlign: isMobile ? "center" : "left", marginTop: isMobile ? 8 : 16 }}>
              <Button
                onClick={handlerClick}
                color="primary"
                variant="contained"
                size="small"
              >
                Checkout
              </Button>
            </div>
          </Grid>
        </Card>
      ) : (
        <Typography component="p" className={classes.emptyCartMessage}>
          No hay productos en el carrito
        </Typography>
      )}
    </Container>
  );
}
