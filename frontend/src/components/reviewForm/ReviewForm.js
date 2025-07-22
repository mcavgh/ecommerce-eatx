import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { createProductReviews } from "../../store/review/review.actions";

const ReviewForm = ({ productId, loggedUserId, updateReviewList, dispatchUpdater, cancelForm, }) => {
  const [postReview, setPostReview] = useState({
    reviewText: "",
    rating: 0,
    productId: parseInt(productId),
    userId: null,
  });
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createProductReviews(postReview, productId));
    setPostReview({ ...postReview, rating: 0 });
    event.target.reset();
    await cancelForm();
    await dispatchUpdater();
    await updateReviewList();
  };

  return (
    <Paper style={{ padding: "20px 20px", marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="center">
          <h2>¿Te gustó la comida? ¡Dejá tu opinión!</h2>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Rating
            name="simple-controlled"
            value={postReview.rating}
            onChange={(event, newValue) => {
              setPostReview({
                ...postReview,
                rating: newValue,
                userId: parseInt(loggedUserId),
              });
            }}
          />
          <TextField
            label="Opinion"
            fullWidth
            multiline
            rows={5}
            autoComplete="none"
            onChange={(event) => {
              setPostReview({ ...postReview, reviewText: event.target.value });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              !postReview.rating ||
              !postReview.reviewText ||
              !postReview.productId ||
              !postReview.userId
            }
            style={{ marginTop: "20px" }}
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ReviewForm;
