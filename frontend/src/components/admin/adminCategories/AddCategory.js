import React, {useEffect} from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { postAddCategory } from '../../../store/category/category.actions'
import { getCategory } from '../../../store/category/category.actions'

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

function AddCategory() {
  const dispatch = useDispatch()
  const addCategoryPost = (values) => {
    onSubmit(values)
  }
  
  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch]);

  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(postAddCategory(values))
    values.name = ''
    values.description = ''
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <h4>Agregar categoria</h4>
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
                    name="name"
                    component={TextField}
                    type="text"
                    label="Nombre de la categoria"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    multiline
                    label="Descripción"
                  />
                </Grid>

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    onClick={() => addCategoryPost(values)}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Agregar
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

export default AddCategory;
