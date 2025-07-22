import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
// import LaptopIcon from '@material-ui/icons/Laptop';
import { useDispatch} from "react-redux";
import { FilterOrders } from '../../../store/order/order.action';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function FilterOrder() {
  const classes = useStyles();


  const dispatch = useDispatch();



  const handleClickCartito = () => {
    dispatch( FilterOrders("carrito"))
  };

  
  const handleClickProcesando = () => {
    dispatch( FilterOrders("procesando"))
  };
  
  const handleClickCompletada = () => {
    dispatch( FilterOrders("completada"))
  };
  
  const handleClickCancelada = () => {
    dispatch( FilterOrders("cancelada"))
  };

  // const handleClickCreada = () => {
  //   dispatch( FilterOrders("creada"))
  // };
  
  const handleClickTodos = () => {
    dispatch( FilterOrders())
  };


  return (
    <div className={classes.root}>
      {/* <Chip
        size="small"
        icon={<LaptopIcon/>}
        label="creada"
        onClick={handleClickCreada}
        color="primary"
      /> */}
      <Chip
        size="small"
        icon={<FaceIcon/>}
        label="Carrito"
        onClick={handleClickCartito}
        color="secondary"
      />
      <Chip
        size="small"
        icon={<AutorenewIcon/>}
        label="procesando"
        onClick={handleClickProcesando}
        color="primary"
      />
      <Chip
        size="small"
        icon={<CheckCircleIcon/>}
        label="completada"
        clickable
        color="secondary"
        onClick={handleClickCompletada}
      />
      <Chip
        size="small"
        icon={<CancelIcon/>}
        label="Cancelada"
        clickable
        color="primary"
        onClick={handleClickCancelada}
      />
      <Chip
        size="small"
        icon={<AccessibilityIcon/>}
        label="Todos"
        onClick={handleClickTodos}
        color="secondary"
      />
    </div>
  );
}