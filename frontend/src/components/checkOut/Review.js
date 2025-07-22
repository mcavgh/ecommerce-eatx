import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector} from "react-redux";
import {useStyles} from './stylesReview'

export default function Review() {
  const classes = useStyles();
  const cart = useSelector(state => state.cart.cartItems)
  const total = useSelector(state => state.cart.total)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Orden
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={`X ${product.count} unidad(es)`}/>
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}