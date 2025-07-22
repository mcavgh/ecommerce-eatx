import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline, MenuItem, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux'
import { getOneProduct, putProduct } from '../../store/product/product.actions';
import { getCategory } from '../../store/category/category.actions'
import UploadImage from '../../components/Product/UploadImage';
import { useParams } from 'react-router-dom'
import AppBar from '../../components/appBar/AppBar'

const validate = values => {
    const errors = {};
    if (!values.productName) {
        errors.productName = 'Required';
    }
    if (!values.description) {
        errors.description = 'Required';
    }
    if (!values.category) {
        errors.category = 'Required';
    }
    if (!values.price) {
        errors.price = 'Required';
    }
    if (!values.stock) {
        errors.stock = 'Required';
    }
    return errors;
};

function PageEditProduct() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryReducer.category)
    const oneProduct = useSelector(state => state.productReducer.oneProduct)
    let productImg = useSelector(state => state.productReducer.productImg)

    const checkCategory = (categories) => {
        if (categories && categories[0]) {
            let categoryList = []
            for (let i in categories) {
                if (categoryList.find(e => e === categories[i].name)) {
                    continue
                } else {
                    categoryList.push(categories[i].name)
                }
            }
            return categoryList
        }
    }

    let categoryList = checkCategory(categories)

    useEffect(() => {
        dispatch(getCategory())
        dispatch(getOneProduct(id))
    }, [dispatch,id]);

    const onSubmit = async values => {

        const { productName, description, price, stock, category } = values
        let priceInt = parseFloat(price)
        let stockInt = parseInt(stock)
        let productData = { productName, description, productImg, priceInt, stockInt, category }
        dispatch(putProduct(productData, id))

    };
    return (
        <div>        
            <AppBar />,
            <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                <CssBaseline />
                <Paper style={{ padding: 16 }}>
                    <UploadImage img={oneProduct.img} />
                </Paper>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{
                        productName: oneProduct.name,
                        price: oneProduct.price,
                        stock: oneProduct.stock,
                        img: oneProduct.img,
                        description: oneProduct.description,
                        category: oneProduct.category,

                    }}
                    validate={validate}
                    render={({ handleSubmit, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{ padding: 16 }}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            fullWidth
                                            required
                                            name="productName"
                                            component={TextField}
                                            type="text"
                                            label="Nombre del Producto"
                                            value="asd"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>

                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="description"
                                            component={TextField}
                                            multiline
                                            label="Descripcion"

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="category"
                                            component={Select}
                                            label="Selecciona la categoria"
                                            formControlProps={{ fullWidth: true }}
                                        >
                                            {(!categoryList) ?
                                                (<Typography >No se encontraron categorias</Typography>)
                                                :
                                                (categoryList.map(category => {
                                                    return (
                                                        <MenuItem value={category}>{category}</MenuItem>
                                                    )
                                                })
                                                )}
                                        </Field>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={6}>
                                            <Field
                                                name="price"
                                                type='number'
                                                component={TextField}
                                                fullWidth
                                                margin="normal"
                                                label="Precio"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                name="stock"
                                                type='number'
                                                component={TextField}
                                                fullWidth
                                                margin="normal"
                                                label="Stock"
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>

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
                                </Grid>
                            </Paper>
                        </form>
                    )}
                />
            </div>
        </div>
    );
}

export default PageEditProduct;
