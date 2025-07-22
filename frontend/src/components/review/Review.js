import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useStyles } from "./styles";
import ReviewForm from "../reviewForm/ReviewForm";

const Review = ({ productId, loggedUser, productReviews, dispatchUpdater, currentUser, ordersUser, }) => {
  const [reviewList, setReviewList] = useState([]);
  const [form, setForm] = useState(false);
  const [reviewsPerPage, setReviewsPerPage] = useState(3);
  const classes = useStyles();

  // Ordena las reviews de nuevas a viejas y hace la paginacion
  //=============================================================
  useEffect(() => {
    if (productReviews.reviews !== undefined) {
      productReviews.reviews.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    setReviewList(productReviews.reviews);
    if (productReviews.reviews !== undefined) {
      setReviewList(productReviews.reviews.slice(0, reviewsPerPage));
    }
  }, [productReviews.reviews, reviewsPerPage, form]);

  // Check si el usuario compro el item y si ya hizo un comentario
  //===============================================================
  useEffect(() => {
    let check = false;
    if (ordersUser !== undefined && ordersUser.length > 0) {
      for (let i = 0; i < ordersUser.length; i++) {
        if (
          ordersUser[i].state === "completa" &&
          ordersUser[i].user.id === loggedUser.id
        ) {
          for (let j = 0; j < ordersUser[i].products.length; j++) {
            if (
              parseInt(ordersUser[i].products[j].id) === parseInt(productId)
            ) {
              check = true;
              setForm(true);
              break;
            }
          }
        }
      }
    }
    if (productReviews.reviews !== undefined && check) {
      const found = productReviews.reviews.find(
        (element) => element.user.id === loggedUser.id
      );
      found ? setForm(false) : setForm(true);
      check = false;
    }
  }, [ordersUser, loggedUser,productReviews,productId]);

  const updateReviewList = () => {
    setReviewList(productReviews.reviews.slice(0, reviewsPerPage));
  };

  const cancelForm = () => {
    setForm(false);
  };

  return (
    <div style={{ padding: 15 }} className={classes.reviews}>
      {form && currentUser ? (
        <ReviewForm
          productId={productId}
          loggedUserId={loggedUser.id}
          updateReviewList={updateReviewList}
          dispatchUpdater={dispatchUpdater}
          cancelForm={cancelForm}
        />
      ) : null}
      { productReviews.reviews && productReviews.reviews.length > 0 ?
      <Paper style={{ padding: "40px 20px" }}>
        <h1>Opiniones</h1>
        {reviewList
          ? reviewList.map((review, index) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={review.user.photoURL} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h3 style={{ margin: 0, textAlign: "left" }}>
                        {`${review.user.name} ${review.user.surname}`}
                      </h3>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </Grid>
                      <p style={{ textAlign: "left" }}>{review.reviewText}</p>
                    </Grid>
                  </Grid>
                  {index === reviewList.length - 1 ? null : (
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                  )}
                </>
              );
            })
          : null}
      </Paper>
        : null }
      {productReviews.reviews &&
      reviewsPerPage >= productReviews.reviews.length ? null : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReviewsPerPage(reviewsPerPage + 3)}
          style={{ marginTop: "20px", width: "100%" }}
        >
          Ver mas
        </Button>
      )}
    </div>
  );
};

export default Review;
