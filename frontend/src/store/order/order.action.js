import axios from "axios";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const PUT_ORDER_BY_ID = "PUT_ORDER_BY_ID";
export const PUT_QUANTITY_OF_ORDER = "PUT_QUANTITY_OF_ORDER";
export const GET_ORDER_BY_USER_ID = "GET_ORDER_BY_USER_ID";
export const AMOUNT_DEPOSITS = "AMOUNT_DEPOSITS";
export const GET_PRODUCTS_OF_USER = "GET_PRODUCTS_OF_USER";
export const DELETE_CART = "DELETE_CART";
export const POST_ORDERS = "POST_ORDERS";
export const GET_FILTER_ORDERS = "GET_FILTER_ORDERS";
export const POST_ORDER_BY_ID = "POST_ORDER_BY_ID";



export const findOrCreateOrders = (userId) => {
  return (dispatch) => {
    axios.post(`/orders/cart/${userId}`).then((res) => {
      dispatch(updateOrder(res.data.id))
      dispatch({ type: POST_ORDER_BY_ID, payload: res.data })
    });
  };
};
export const updateOrder = (orderId) => {
  return (dispatch, getState) => {
    const cartQuantity = getState().cart.cartQuantity;
    const total = getState().cart.total;
    const cartItems = getState().cart.cartItems.slice();
    const newOrder = {
      price: total,
      quantity: cartQuantity,
    };
    axios.put(`/orders/${orderId}/modifica`, newOrder)
      .then(async (resp) => {
        await cartItems.forEach((product) => {
          axios.post(`/cart/${product.id}/order/${resp.data.data.id}/quantity/${product.count}`
          ).then((res) => { });
        });
      }).then((resp) => {
      }).catch((err) => console.log(err));
  };
};
export const deleteFromOrders = (userId,product) => {
  return (dispatch) => {//busca la orden..
    axios.post(`/orders/cart/${userId}`).then((res) => {
      dispatch(deleteItem(res.data.id,product))
      dispatch({ type: POST_ORDER_BY_ID, payload: res.data })
    });
  };
};
export const deleteItem = (orderId,product) => {
  return (dispatch, getState) => {
    const cartQuantity = getState().cart.cartQuantity;
    const total = parseFloat(getState().cart.total);
    const cartItems = getState().cart.cartItems.slice();
    const newOrder = {
      price: total,
      quantity: cartQuantity,
    };//modificamos el precio y cantidad de la orden
    axios.put(`/orders/${orderId}/modifica`, newOrder)
      .then(async (resp) => {//eliminamos la relacion entre order y producto
        axios.delete(`/cart/${product.id}/order/${resp.data.data.id}`
        ).then((res) => { });

      }).then((resp) => {
      }).catch((err) => console.log(err));
  };
};
export const addProducttoOrder = (orderId, productId) => {
  return (dispatch, getState) => {
    axios
      .post(`/cart/${productId}/order/${orderId}`)
      .then((res) => { })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAllOrders = () => {
  return (dispatch) => {
    axios.get(`/orders/`).then((res) => {
      return dispatch({ type: GET_ALL_ORDERS, payload: res.data });
    });
  };
};

export const FilterOrders = (estado) => {
  return (dispatch) => {
    axios.get(`/orders/`).then((res) => {
      dispatch({
        type: GET_FILTER_ORDERS,
        payload: estado
          ? res.data.filter((e) => e.state === `${estado}`)
          : res.data,
      });
    });
  };
};

export const getOrderById = (id) => {
  return function (dispatch) {
    axios
      .get(`/orders/${id}`)
      .then((order) => {
        dispatch({ type: GET_ORDER_BY_ID, payload: order.data[0] });
      })
      .catch((err) => console.log(err));
  };
};
export const getOrderByUserId = (id) => {
  return function (dispatch) {
    axios.get(`/orders/user/${id}`).then((payload) => {
      dispatch({ type: GET_ORDER_BY_USER_ID, payload: payload.data });
    });
  };
};

export const putOrderById = (id, data) => {
  return function (dispatch) {
    axios
      .put(`/orders/${id}/modifica`, data)
      .then((payload) => {
        dispatch({ type: PUT_ORDER_BY_ID, payload: payload.data });
        dispatch(getOrderById(id));
      })
      .catch((err) => console.log(err));
  };
};

export const cleanCart = (id) => {
  return function (dispatch) {
    axios
      .delete(`/cart/${id}/cart`)
      .then((payload) => {
        dispatch({ type: DELETE_CART, payload: payload });
      })
      .catch((err) => console.log(err));
  };
};

export const putDataAddress = (data, id) => {
  return function (dispatch) {
    axios.put(`orders/${id}/modifica`, data)
      .then((payload) => {
        dispatch({ type: PUT_ORDER_BY_ID, payload: payload.data });
        dispatch(getOrderById(id));
      })
      .catch((err) => { console.log(err) });
  };
};
export const orderToMp = (products, id) => {

  return function (dispatch) {
    return axios.post(`mercadopago/${id}`, { products })
      .then((res) => {
        window.location.replace(res.data.init_point)
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
