import {
  GET_PRODUCTS_IN_WISHLIST, GET_PRODUCTS_IN_CART, GET_QUANTITY, GET_TOTAL, ADD_TO_CART, REMOVE_FROM_CART
} from "./cart.actions";

export const cartReducer = (
  state = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_IN_CART:
      return {
        ...state,
        cartItems: action.payload
      };
    case GET_QUANTITY:
      return {
        ...state,
        cartQuantity: action.payload
      };

    case ADD_TO_CART:
      return {
        ...state,

        cartItems: action.payload.cartItems
      };
    case REMOVE_FROM_CART:
      return {
        ...state,

        cartItems: action.payload.cartItems
      };
    case GET_TOTAL:
      return {
        ...state,
        total: action.payload
      }
  
    default:
      return state;
  }
};
