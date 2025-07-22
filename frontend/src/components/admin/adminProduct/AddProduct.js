import React, { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import UploadImage from '../../Product/UploadImage';
import { Paper, Grid, Button, CssBaseline, MenuItem, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux'
import { postProducts } from '../../../store/product/product.actions';
import { getCategory } from '../../../store/category/category.actions'

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

function AddProduct() {

  const dispatch = useDispatch()
  const categories = useSelector(state => state.categoryReducer.category)
  let productImg = useSelector(state => state.productReducer.productImg)

  const checkCategory = (categories) => {
    if (categories && categories[0]) {
      let categoryList = []
      for (let i in categories) {
        if (categoryList.find(e => e === categories[i].name)) {
          continue
        } else {
          categoryList.push(categories[i])
        }
      }
      return categoryList
    }
  }

  let categoryList = checkCategory(categories)

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch]);

  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    const{productName,description,price,stock,category}=values
    let priceInt= parseFloat(price)
    let stockInt= parseInt(stock)
    let productData={productName,description,productImg, priceInt,stockInt,category}  
     dispatch(postProducts(productData,category))    

  };
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
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
                <Grid item xs={6}>
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
                          <MenuItem value={category.id}>{category.name}</MenuItem>
                        )
                      })
                      )}
                  </Field>
                </Grid>
                  <Grid item xs={6}>
                  <UploadImage/>

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
  );
}

export default AddProduct;
