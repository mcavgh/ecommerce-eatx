import {
  GET_FILTER_ORDERS,
  POST_ORDERS,
  DELETE_CART,
  GET_ALL_ORDERS,
  GET_PRODUCTS_OF_USER,
  GET_ORDER_BY_ID,
  PUT_ORDER_BY_ID,
  GET_ORDER_BY_USER_ID,
  POST_ORDER_BY_ID,
} from "./order.action";

var initialState = {
  orders: [],
  ordersUser: [],
  orderId:[],
  filterorders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // case POST_ORDERS:
    //   return {
    //     ...state,
    //     orders: [],
    //   };
    case DELETE_CART:
      return {
        ...state,
        ordersUser: action.payload,
      };
    // case GET_FILTER_ORDERS:
    //   return {
    //     ...state,
    //     filterorders: action.payload,
    //   };
    case POST_ORDERS:
    case GET_ALL_ORDERS:
    case GET_FILTER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case POST_ORDER_BY_ID:
    case GET_PRODUCTS_OF_USER:
    case GET_ORDER_BY_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case GET_ORDER_BY_USER_ID:
      return {
        ...state,
        ordersUser: action.payload,
      };
    case PUT_ORDER_BY_ID:
      return {
        ...state,
        ordersUser: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
