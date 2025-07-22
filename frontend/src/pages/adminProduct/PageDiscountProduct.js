import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline, MenuItem, Typography, InputAdornment } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux'
import { getOneProduct, putProduct } from '../../store/product/product.actions';
import { useParams } from 'react-router-dom'
import AppBar from '../../components/appBar/AppBar'
import axios from "axios"
import Swal from 'sweetalert2';

const validate = values => {
    const errors = {};
    if (!values.discount) {
        errors.productName = 'Required';
    }

    if (!values.day) {
        errors.category = 'Required';
    }

    return errors;
};

function PageDiscountProduct() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const oneProduct = useSelector(state => state.productReducer.oneProduct)
    let productImg = useSelector(state => state.productReducer.productImg)




    useEffect(() => {
        dispatch(getOneProduct(id))
    }, [dispatch, id]);

    const onSubmit = async values => {
        axios.put(`/products/${oneProduct.id}/discount/${values.discount}`)
            .then(modifies => {
                axios.get(`/users/product/${modifies.data.id}/wishlist`)
                    .then(Swal.fire('Exito!', `se hizo el descuento y se envio el email a los usuarios suscriptos`, 'success'))

            })
    };
    return (
        <div>
            <AppBar />,
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />

                <Form
                    onSubmit={onSubmit}
                    initialValues={{
                        discount: "0",
                        day: "todos",

                    }}
                    validate={validate}
                    render={({ handleSubmit, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{ padding: 16 }}>
                                    <Typography variant="h5" >Descuento de {oneProduct.name}</Typography>
                                    <Grid item>
                                        {/* <Field
                                            value="all"
                                            name="day"
                                            component={Select}
                                            label="Selecciona el dia"
                                            formControlProps={{ fullWidth: true }}
                                        >
                                            <MenuItem value="todos">
                                                todos
                                            </MenuItem>
                                            <MenuItem value={"lunes"}>{"lunes"}</MenuItem>
                                            <MenuItem value={"martes"}>{"martes"}</MenuItem>

                                        </Field> */}
                
                                        <Field
                                            startAdornment={<InputAdornment position="start">"%"</InputAdornment>}
                                            name="discount"
                                            type='number'
                                            component={TextField}
                                            margin="normal"
                                            label="Descuento  %"

                                        />


                                    </Grid>
                                    <Grid item
                                        xs={12}
                                        style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                            </Paper>
                        </form>
                    )}
                />
            </div>
        </div>
    );
}

export default PageDiscountProduct;
