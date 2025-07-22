import {
  GET_PRODUCT_REVIEWS,
  CREATE_PRODUCT_REVIEWS,
  GET_USER_REVIEWS,
  DELETE_REVIEW,
  EDIT_REVIEW,
} from "./review.actions";

const initialState = {
  productReviews: {},
  userReviews: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return {
        ...state,
        productReviews: action.payload,
      };
    case CREATE_PRODUCT_REVIEWS:
      return state;
    case GET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload,
      };
    case DELETE_REVIEW:
        return state;
    case EDIT_REVIEW:
        return state;

    default:
      return state;
  }
};

export default reviewReducer;
