import {
  SET_PRODUCT_IMG,
  POST_PRODUCTS_SUCCESS,
  POST_PRODUCTS_FAILURE,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_ONE_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  PUT_PRODUCT_BY_ID,
  GET_DISCOUNT_PRODUCTS
} from "./product.actions";
import {
  SEARCH_PRODUCT_REQUEST_CATEGORIES,
  SEARCH_PRODUCT_SUCCESS_CATEGORIES,
  SEARCH_PRODUCT_FAILURE_CATEGORIES,
} from "../category/category.actions";

const initialState = {
  products: [],
  oneProduct: {},
  productError: "",
  productImg: "no tiene",
  Error: "",
  Loading: "",
  searchResults: [],
  discountProducts:[]
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISCOUNT_PRODUCTS:
      return{
        ...state,
        discountProducts:action.payload
      }
    case PUT_PRODUCT_BY_ID:
      return { ...state };
    case DELETE_PRODUCT_BY_ID:
      return {
        ...state,
      };
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        Loading: true,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        Loading: false,
        searchResults: action.payload,
      };
    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        Error: "error 404",
        Loading: false,
      };
    case SET_PRODUCT_IMG:
      return {
        ...state,
        productImg: action.payload,
      };
    case SEARCH_PRODUCT_REQUEST_CATEGORIES:
      return {
        ...state,
        Loading: true,
      };
    case SEARCH_PRODUCT_SUCCESS_CATEGORIES:
      return {
        ...state,
        Loading: false,
        searchResults: action.payload,
      };
    case SEARCH_PRODUCT_FAILURE_CATEGORIES:
      return {
        ...state,
        Error: "error 404",
        Loading: false,
      };
    case POST_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case POST_PRODUCTS_FAILURE:
      return {
        ...state,
        productError: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_ONE_PRODUCT:
      return {
        ...state,
        oneProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
