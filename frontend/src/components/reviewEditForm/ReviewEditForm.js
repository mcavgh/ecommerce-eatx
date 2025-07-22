import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { editReview } from "../../store/review/review.actions";

const ReviewEditForm = ({ loggedUserId, reviewId, closeEditForm }) => {
  const [postReview, setPostReview] = useState({
    reviewText: "",
    rating: 0,
    userId: null,
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editReview(postReview, reviewId, loggedUserId));
    closeEditForm();
    event.target.reset();
  };

  return (
    <Paper
      style={{ padding: "20px 20px", marginTop: "20px", marginBottom: "20px" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="center">
          <h2>Ya puedes editar el comentario!</h2>
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
              !postReview.rating || !postReview.reviewText || !postReview.userId
            }
            style={{ marginTop: "20px" }}
          >
            Editar
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ReviewEditForm;