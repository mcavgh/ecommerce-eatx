import { combineReducers } from "redux";
import productReducer from "./product/product.reducer";
import categoryReducer from "./category/category.reducer";
import orderReducer from "./order/order.reducer";
import userReducer from "./user/user.reducer";
import { cartReducer as cart } from "./cart/cart.reducer";
import reviewReducer from "./review/review.reducer";
import  darckModeReducer from "./darckMode/darckMode.reducer";

export default combineReducers({
  productReducer,
  categoryReducer,
  orderReducer,
  userReducer,
  cart,
  reviewReducer,
  darckModeReducer,
});
