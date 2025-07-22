import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  Paper,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import { useStyles } from "./styles";
import AppBar from "../appBar/AppBar";
import defaultImg from "./default.png";
import { addToCart } from "../../store/cart/cart.actions";
import { getUsersByEmailId } from "../../store/user/user.action";
import { getProductReviews } from "../../store/review/review.actions";
import { getOrderByUserId } from "../../store/order/order.action";
import Review from "../review/Review";
import { AuthContext } from "../AuthContext";

export default function Product() {
  const [ratingAvg, setRatingAvg] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) dispatch(getUsersByEmailId(currentUser.email));
    if (currentUser) dispatch(getOrderByUserId(currentUser.id));
    dispatch(getProductReviews(id));
  }, [dispatch,currentUser,id]);

  const loggedUser = useSelector((state) => state.userReducer.userId);
  const productReviews = useSelector(
    (state) => state.reviewReducer.productReviews
  );
  const { img, name, description, price, stock } = productReviews;

  const dispatchUpdater = () => {
    dispatch(getProductReviews(id));
  };

  useEffect(() => {
    if (productReviews.reviews !== undefined) {
      const ratingArray = [];
      productReviews.reviews.forEach((review) => {
        ratingArray.push(parseInt(review.rating));
      });
      if (ratingArray.length > 0) {
        let sum = ratingArray.reduce(
          (previous, current) => (current += previous)
        );
        setRatingAvg(sum / ratingArray.length);
      } else {
        setRatingAvg(0);
      }
    }
  }, [productReviews.reviews]);

  useEffect(() => {
    if (loggedUser.id) dispatch(getOrderByUserId(loggedUser.id));
  }, [dispatch, loggedUser]);
  const ordersUser = useSelector((state) => state.orderReducer.ordersUser);

  return (
    <>
      <AppBar />
      {name && name.length === 0 ? (
        <h1>Cargando...</h1>
      ) : (
        <Paper className={classes.paper}>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={12} sm={6}>
              <img
                src={!img ? defaultImg : img}
                alt="Food"
                className={classes.media}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container direction="column" className={classes.info}>
                <Box mt={2}>
                  <Typography variant="h4">{name}</Typography>
                  <Divider />
                  <Typography variant="subtitle1">{description}</Typography>
                  <Typography variant="h5">Price: ${price}</Typography>
                  <Typography variant="h6">Stock: {stock}</Typography>
                  <Typography variant="h6">
                    Rating:{" "}
                    <Rating name="read-only" value={ratingAvg} readOnly />
                    <p
                      style={{
                        textAlign: "left",
                        color: "gray",
                        fontSize: "16px",
                      }}
                    >
                      Puntuación basada en{" "}
                      {productReviews.reviews !== undefined &&
                        productReviews.reviews.length}{" "}
                      opninion/es
                    </p>
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => dispatch(addToCart(productReviews))}
                >
                  Agregar al Carrito!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      <Review
        productId={id}
        loggedUser={loggedUser}
        productReviews={productReviews}
        dispatchUpdater={dispatchUpdater}
        currentUser={currentUser}
        ordersUser={ordersUser}
      />
    </>
  );
}
