import {GET_USER_WISHLIST, POST_USER_ACCESS, POST_ADMIN, GET_USER_BYID, GET_ID_BYEMAIL, DELETE_USER, PUT_USER, GET_USERS, EDIT_AVATAR } from './user.action';

const initialState = {
  users: [],
  user: undefined,
  userId: {},
  wishList:[]
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WISHLIST:
      return{
        ...state,
        wishList:action.payload
      }
    case POST_USER_ACCESS:
    case POST_ADMIN:
    case EDIT_AVATAR:
    case GET_USER_BYID:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ID_BYEMAIL:
      return {
        ...state,
        userId: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        userId: {}
      }
    case PUT_USER:
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}


export default userReducer;



