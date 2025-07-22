import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function AddressForm({setFormValidate}) {  
  const [address, setAddress]=React.useState('')
  const [number, setNumber]=React.useState('')
  const [state, setState]=React.useState('')
  const [zip, setZip]=React.useState('')
  const [country, setCountry]=React.useState('')
  const addressData=address+number+country+state+zip
  
  const handleChangeAddress = event => {
    setAddress(event.target.value)
  }
  const handleChangeNumber = event => {
    setNumber(event.target.value)
  }
  const handleChangeState = event => {
    setState(event.target.value)
  }
  const handleChangeZip = event => {
    setZip(event.target.value)
  }
  const handleChangeCountry = event => {
    setCountry(event.target.value)
  }
  
  useEffect(()=>{ 
    setFormValidate(addressData)
  },[setFormValidate,addressData])
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de envio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField required onChange={handleChangeAddress} id="address1" name="address1" label="Domicilio" fullWidth autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeNumber} id="number" name="number" label="Numeración" fullWidth autoComplete="number" type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChangeState} id="state" name="state" label="Provincia" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeZip} id="zip" name="zip" label="Codigo Postal" fullWidth autoComplete="shipping postal-code" type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeCountry} id="country"  name="country" label="Ciudad" fullWidth autoComplete="shipping country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}