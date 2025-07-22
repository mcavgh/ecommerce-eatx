import axios from 'axios'
import Swal from 'sweetalert2'

export const GET_CATEGORY = "GET_CATEGORY";
export const DELETE_CATEGORY_BY_ID = "DELETE_CATEGORY_BY_ID"
export const POST_ADD_CATEGORY = 'POST_ADD_CATEGORY'
export const SEARCH_PRODUCT_REQUEST_CATEGORIES = "SEARCH_PRODUCT_REQUEST_CATEGORIES";
export const SEARCH_PRODUCT_SUCCESS_CATEGORIES = "SEARCH_PRODUCT_SUCCESS_CATEGORIES";
export const SEARCH_PRODUCT_FAILURE_CATEGORIES = "SEARCH_PRODUCT_FAILURE_CATEGORIES";
export const EDIT_CATEGORY_BY_ID = 'EDIT_CATEGORY_BY_ID'

export const getCategory = () => dispatch => {
    let URL = "/category/get"
    axios.get(URL)
        .then(res => {
            dispatch({ type: 'GET_CATEGORY', payload: res.data })
        }).catch(err => {
            dispatch({ type: 'GET_CATEGORY', payload: err })
        })
}

export const putEditCategory = (values, categoryId) => {
    return (dispatch) => {
        const options = {
            method: 'PUT',
            url: `/category/${categoryId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        };
        return axios.request(options).then(function (values) {
            Swal.fire(
                'Good job!',
                'You updated the product succesfully!',
                'success'
            )
            dispatch({type: EDIT_CATEGORY_BY_ID})
        })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: 'Something went wrong!',
                })
            })
    }
}

export const putDeleteCategory = (id) => dispatch => {
    axios.delete(`/category/${id}`)
        .then(res => {
            dispatch({ type: DELETE_CATEGORY_BY_ID, payload: res })
            dispatch(getCategory())
            Swal.fire('Good job!', 'You delete the product succesfully!', 'success')
        })
        .catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'error', title: 'Oops...', text: 'Something went wrong!',
            })
        })
}

export const postAddCategory = (category) => dispatch => {
    let URL = `/category`
    axios.post(URL, category, { headers: { 'Content-Type': 'application/json' } })
        .then(res => {
            dispatch({ type: 'POST_ADD_CATEGORY', payload: res })
            Swal.fire('Good job!', 'You updated the product succesfully!', 'success')
        }).catch(err => {
            dispatch({ type: 'POST_ADD_CATEGORY', payload: err })
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!', })
        })
}

export const searchProductRequest = () => {
    return {
        type: 'SEARCH_PRODUCT_REQUEST_CATEGORIES',
    }
}
export const searchProductSuccess = (products) => {
    return {
        type: 'SEARCH_PRODUCT_SUCCESS_CATEGORIES',
        payload: products
    }
}
export const searchProductFailure = (error) => {
    return {
        type: 'SEARCH_PRODUCT_FAILURE_CATEGORIES',
        payload: error
    }
}

export const searchProducts = (name) => {
    return (dispatch) => {
        dispatch(searchProductRequest())
        axios.get(`/category/productsbycategories/${name}`)
            .then(products => {
                dispatch(searchProductSuccess(products.data[0].products))
            })
            .catch(error => {
                dispatch(searchProductFailure(error))
            })
    }
}
