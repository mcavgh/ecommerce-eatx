import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Divider, Avatar, Grid, Paper, IconButton, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Edit, Delete } from "@material-ui/icons";
import Appbar from "../../components/appBar/AppBar";
import ReviewEditForm from "../../components/reviewEditForm/ReviewEditForm";
import { getUserReviews } from "../../store/review/review.actions";
import { deleteReview } from "../../store/review/review.actions";
import Swal from "sweetalert2";
import UserPersonalData from "../../components/userPersonalData/UserPersonalData";

const Profile = () => {
  const [editForm, setEditForm] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReviews(id));
  }, [dispatch, id]);

  const userReviews = useSelector((state) => state.reviewReducer.userReviews);

  const handleDelete = (reviewId, userId) => {
    Swal.fire({
      icon: "info",
      title: "Estas seguro/a que quieres eliminar el comentario?",
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(reviewId, userId));
      }
    });
  };

  const handleEdit = (reviewId) => {
    setEditForm(reviewId);
  };

  const closeEditForm = () => {
    setEditForm(null);
  };

  return (
    <div>
      <Appbar />
      <Paper style={{ padding: "40px 20px", margin: "15px" }}>
        <UserPersonalData userData={userReviews}/>
      </Paper>
      { userReviews.reviews && userReviews.reviews.length > 0 ?
        <Paper style={{ padding: "40px 20px", margin: "15px" }}>
          <h2>Tus Opiniones:</h2>
          {userReviews.reviews
            ? userReviews.reviews.map((review, index) => {
                return (
                  <>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar alt="Remy Sharp" src={userReviews.photoURL} />
                      </Grid>
                      <Grid justifyContent="left" item  zeroMinWidth>
                        <h3 style={{ margin: 0, textAlign: "left" }}>
                          {`${userReviews.name} ${userReviews.surname}`}
                        </h3>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                          spacing={2}
                        >
                          <Grid item>
                            <Typography variant="subtitle1">{review.product.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Rating
                              name="read-only"
                              value={review.rating}
                              readOnly
                            />
                          </Grid>
                        </Grid>
                        <p style={{ textAlign: "left" }}>{review.reviewText}</p>
                      </Grid>
                      <Grid item justifyContent="right">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(review.id, userReviews.id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(review.id)}
                        >
                          <Edit />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {index === userReviews.reviews.length - 1 ? null : (
                      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                    )}
                    {editForm === review.id ? (
                      <ReviewEditForm
                        loggedUserId={id}
                        reviewId={review.id}
                        closeEditForm={closeEditForm}
                      />
                    ) : null}
                  </>
                );
              })
            : null}
        </Paper>
      : null }
    </div>
  );
};

export default Profile;