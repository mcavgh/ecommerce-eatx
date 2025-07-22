import React, { useEffect } from 'react';
import { useStyles } from './stylesCheckout'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from '../../components/checkOut/AddressForm';
import Review from '../../components/checkOut/Review';
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { orderToMp } from '../../store/order/order.action'
import { putDataAddress } from '../../store/order/order.action'
import emailjs from 'emailjs-com';
import { putProduct } from '../../store/product/product.actions';

export function Checkout() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [formValidate, setFormValidate] = React.useState('')
  const cart = useSelector(state => state.cart.cartItems)
  const total = useSelector(state => state.cart.total)
  const email = useSelector(state => state.userReducer.userId.email)
  const userId = useSelector(state => state.userReducer.userId.id)
  const steps = ['Completa tus datos de envio', 'Controla tu orden'];
  const orderId = useSelector((state) => state.orderReducer.orderId);
  const data = { address: formValidate, state: 'procesando' }


  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm setFormValidate={setFormValidate} />;
      case 1:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (formValidate !== '') {
      setActiveStep(activeStep + 1)
      dispatch(putDataAddress(data, orderId.id))
    }
    else { alert('Debe completar los campos') }
  };

  useEffect(() => {
    if (orderId.products) {
      orderId.products.forEach((product) => {
        let  stock ={stockInt: product.stock - product.order_line.quantity};
        if(stock<0){stock={stockInt:0}
        dispatch(putProduct( stock, product.id))
       }else{
        dispatch(putProduct( stock, product.id))
       }
        
      })
    }

  }, [dispatch, handleNext])


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const terminarCompra = () => {
    dispatch(orderToMp(cart, userId))
    let products = cart.map(prod => prod.name).join(", ");
    emailjs.send('service_wh6ybz2', 'template_adk9g6f', { products: products, total: total, email: email }, 'user_TgPSia94H5R5iet7h197p')
      .then((result) => {
      }, (error) => { console.log(error.text); })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por tu compra!.
                </Typography>
                <Typography variant="subtitle1">
                  Tu pedido esta en camino!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}> Volver</Button>
                  )}
                  {(activeStep === steps.length - 1) ? (<Button onClick={terminarCompra} variant="contained" color="primary" className={classes.button}>
                    Terminar Compra</Button>) : (<Button onClick={handleNext} variant="contained" color="primary" className={classes.button}>Siguiente</Button>)}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Button to='/' component={Link}>Volver al inicio</Button>
      </main>
    </React.Fragment>
  );
}