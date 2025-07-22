import axios from "axios";
import Swal from "sweetalert2";

export const GET_PRODUCT_REVIEWS = "GET_PRODUCT_REVIEWS";
export const GET_USER_REVIEWS = "GET_USER_REVIEWS";
export const CREATE_PRODUCT_REVIEWS = "CREATE_PRODUCT_REVIEWS";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const EDIT_REVIEW = "EDIT_REVIEW";

export const getProductReviews = (productId) => {
  return (dispatch) => {
    return axios
      .get(`/review/product/${productId}`)
      .then((result) => {
        dispatch({
          type: GET_PRODUCT_REVIEWS,
          payload: result.data,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const createProductReviews = (review, productId) => {
  return (dispatch) => {
    return axios
      .post(`/review`, review)
      .then((result) => {
        dispatch(getProductReviews(productId))
        dispatch({
          type: CREATE_PRODUCT_REVIEWS,
          payload: {
            reviewText: review.reviewText,
            rating: review.rating,
            productId: review.productId,
            userId: review.userId,
          },
        });
        Swal.fire("Genial!", "Tu opinion se guardó correctamente!", "success");
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const getUserReviews = (userId) => {
  return (dispatch) => {
    return axios
      .get(`/review/user/${userId}`)
      .then((result) => {
        dispatch({
          type: GET_USER_REVIEWS,
          payload: result.data,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const deleteReview = (reviewId, userId) => {
  return (dispatch) => {
    axios
      .delete(`/review/${reviewId}`)
      .then((review) => {
        dispatch(getUserReviews(userId));
        Swal.fire("Genial!", "Se elimino la opinion exitosamente!", "success");
        dispatch({
          type: DELETE_REVIEW,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editReview = (review, reviewId, userId) => {
  return (dispatch) => {
    axios
      .put(`/review/${reviewId}`, review)
      .then((review) => {
        dispatch(getUserReviews(userId));
        Swal.fire("Genial!", "Se edito la opinion exitosamente!", "success");
        dispatch({
          type: EDIT_REVIEW,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};