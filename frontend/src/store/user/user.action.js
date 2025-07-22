import axios from "axios";
import { getUserReviews } from "../review/review.actions"

export const GET_CART = "GET_CART";
export const GET_USER_BYID = "GET_USER_BYID";
export const GET_USERS = "GET_USERS";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";
export const SELECT_USER = "SELECT_USER";
export const CREATE_USER = "CREATE_USER";
export const GET_ID_BYEMAIL = "GET_ID_BYEMAIL";
export const POST_ADMIN = "POST_ADMIN";
export const POST_USER_ACCESS = "POST_USER_ACCESS";
export const GET_USER_WISHLIST = "GET_USER_WISHLIST";
export const GET_PRODUCTS_IN_WISHLIST = "GET_PRODUCTS_IN_WISHLIST"
export const EDIT_AVATAR = "EDIT_AVATAR"

export const getUserWishList = (userId) =>(dispatch)=> {
  axios.get(`/users/${userId}/wishList`).then((res) => {
    dispatch({ type: GET_USER_WISHLIST, payload: res.data });
    
})
}

export const addToWishList = (product) => (dispatch, getState) => {
  const userId = getState().userReducer.userId.id;
  return axios.post(`users/${userId}/product/${product.id}`).then(product => {
    dispatch({
      type: GET_PRODUCTS_IN_WISHLIST,
    })
    dispatch(getUserWishList(userId))

  })
}
export const deleteFromWishList = (product) => (dispatch, getState) => {
  const userId = getState().userReducer.userId.id;
  return axios.delete(`users/${userId}/product/${product.id}`).then(product => {
    dispatch({
      type: "DELETE_PRODUCTS_FROM_WISHLIST",
    })
     dispatch(getUserWishList(userId))

  })
}
export const postUser = (displayName, email, photoURL) => {
    return (dispatch, getState) => {
        const nameArray = displayName.split(" ")
        axios.post(`/users/register`, { name: nameArray[0], surname: nameArray[1],email:email, photoURL: photoURL}).then((res) => {
            dispatch({ type: GET_ID_BYEMAIL, payload: res.data });
        })
    }
}

export const postAdmin = (id) => {
    return (dispatch) => {
        axios.put(`/users/${id}/usuario/admin`).then((res) => {
            dispatch({ type: POST_ADMIN });
             dispatch(getUsers())
        })
    }
}
export const postUserAccess = (id) => {
    return (dispatch) => {
        axios.put(`/users/${id}/usuario/user`).then((res) => {
            dispatch({ type: POST_USER_ACCESS });
             dispatch(getUsers())
        })
    }
}

export const DestroyUsuario= (id) => {
    return (dispatch) => {
        axios.delete(`/users/${id}`).then((res) => {
            dispatch({ type:DELETE_USER});
             dispatch(getUsers())
        })
    }
}


export const getUsersByEmailId = (email) => {
  return function (dispatch) {
    axios.get(`/users/email/${email}`).then((user) => {
      dispatch({ type: GET_ID_BYEMAIL, payload: user.data });
    });
  };
};

export const getUsersById = (id) => {
  return function (dispatch) {
    axios.get(`/users/${id}`).then((payload) => {
      dispatch({ type: GET_USER_BYID, payload: payload.data });
    });
  };
};

export const getUsers = () => {
  return function (dispatch) {
    axios.get(`/users/users`).then((payload) => {
      dispatch({ type: GET_USERS, payload: payload.data });
    });
  };
};

export const editAvatar = (id, photoURL) => {
  return (dispatch) => {
    axios
      .put(`/users/${id}/avatar`, { photoURL: photoURL })
      .then((review) => {
        dispatch(getUserReviews(id));
        dispatch({
          type: EDIT_AVATAR,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};