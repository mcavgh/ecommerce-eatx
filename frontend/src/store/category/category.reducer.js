import { GET_CATEGORY, POST_ADD_CATEGORY, DELETE_CATEGORY_BY_ID,EDIT_CATEGORY_BY_ID } from './category.actions';

const initialState = {
  category: '',
  postState: ''
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_CATEGORY_BY_ID:
      return {
        ...state
      }
    case GET_CATEGORY:
      return {
        category: action.payload
      };
    case POST_ADD_CATEGORY:
      return {
        postState: action.payload
      };
    case DELETE_CATEGORY_BY_ID:
      return {
        postState: action.payload
      };
    default:
      return state;
  }
}


export default categoryReducer;