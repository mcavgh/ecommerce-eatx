import axios from "axios";
import Swal from "sweetalert2";

export const POST_PRODUCTS_SUCCESS = "POST_PRODUCTS_SUCCESS";
export const POST_PRODUCTS_FAILURE = "POST_PRODUCTS_FAILURE";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_ONE_PRODUCT = "GET_ONE_PRODUCT";
export const SET_PRODUCT_IMG = "SET_PRODUCT_IMG";
export const SEARCH_PRODUCT_REQUEST = "SEARCH_PRODUCT_REQUEST";
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";
export const SEARCH_PRODUCT_FAILURE = "SEARCH_PRODUCT_FAILURE";
export const DELETE_PRODUCT_BY_ID = "DELETE_PRODUCT_BY_ID";
export const PUT_PRODUCT_BY_ID = "PUT_PRODUCT_BY_ID";
export const GET_DISCOUNT_PRODUCTS = "GET_DISCOUNT_PRODUCTS";

//GET DISCOUNT PRODUCTS
export const getDiscountProducts = () => {
  return (dispatch) => {
    return axios
      .get(`/products/`)
      .then((products) => {
        const discountProducts=products.data.filter(prod=>{
          return prod.discount>0
        })
        dispatch({
          type: GET_DISCOUNT_PRODUCTS,
          payload:discountProducts,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

//EDIT PRODUCT BY ID

export const putProduct = (product, idProduct) => {
  return (dispatch) => {
    const options = {
      method: "PUT",
      url: `/products/${idProduct}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: product,
    };
    return axios
      .request(options)
      .then(function (products) {
        Swal.fire(
          "Good job!",
          "You updated the product succesfully!",
          "success"
        );
        dispatch({type: PUT_PRODUCT_BY_ID,});
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

//DELETE PRODUCT BY ID
export const deleteProductById = (id) => {
  return (dispatch) => {
    axios
      .delete(`/products/${id}`)
      .then((products) => {
        dispatch(getProducts());
        Swal.fire(
          "Good job!",
          "You delete the product succesfully!",
          "success"
        );
        dispatch({
          type: DELETE_PRODUCT_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// PARA QUE TRAIGA PRODUCTOS POR NOMBRE
export const searchProducts = (name) => {
  return (dispatch) => {
    dispatch(searchProductRequest());
    axios
      .get(`/products/search/${name}`)
      .then((products) => {
        dispatch(searchProductSuccess(products.data));
      })
      .catch((error) => {
        dispatch(searchProductFailure(error));
      });
  };
};

export const searchProductRequest = () => {
  return {
    type: SEARCH_PRODUCT_REQUEST,
  };
};
export const searchProductSuccess = (product) => {
  return {
    type: SEARCH_PRODUCT_SUCCESS,
    payload: product,
  };
};
export const searchProductFailure = (error) => {
  return {
    type: SEARCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const setImgUrl = (imgUrl) => {
  return {
    type: SET_PRODUCT_IMG,
    payload: imgUrl,
  };
};

export const postProducts = (product, categoryId) => {
  return (dispatch) => {
    const options = {
      method: "POST",
      url: `/products/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: product,
    };
    return axios
      .request(options)
      .then(function (product) {
        dispatch(addCategoryToProducts(product.data.id, categoryId));
        dispatch(postProductsSuccess(product.data));
      })
      .catch((error) => {
        dispatch(postProductsFailure(error));
      });
  };
};

export const addCategoryToProducts = (idProduct, idCategory) => {
  // console.log(idProduct)
  return (dispatch) => {
    return axios
      .post(`/products/${idProduct}/category/${idCategory}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log({ message: err.message }));
  };
};
export const getProducts = () => {
  return (dispatch) => {
    return axios
      .get(`/products/`)
      .then((result) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: result.data,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const getOneProduct = (id) => {
  return (dispatch) => {
    return axios
      .get(`/products/${id}`)
      .then((result) => {
        dispatch({
          type: GET_ONE_PRODUCT,
          payload: result.data,
        });
      })
      .catch((err) => console.log({ message: err.message }));
  };
};

export const postProductsSuccess = (products) => {
  Swal.fire("Good job!", "You create the product succesfully!", "success");
  return {
    type: POST_PRODUCTS_SUCCESS,
    payload: products,
  };
};
export const postProductsFailure = (error) => {
  return {
    type: POST_PRODUCTS_FAILURE,
    payload: error,
  };
};
