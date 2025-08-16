import React, { useEffect } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useSelector } from "react-redux";
import { Typography, Box, Container, Divider, CircularProgress } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { getDiscountProducts } from '../../store/product/product.actions';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -10,
      left: 0,
      width: 60,
      height: 4,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2,
    },
  },
  carouselContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2, 0),
  },
  noProductsMessage: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(6),
  }
}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export const DiscountProducts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const discountProducts = useSelector(state => state.productReducer?.discountProducts);
  const loading = useSelector(state => state.productReducer?.loading);

  useEffect(() => {
    dispatch(getDiscountProducts());
  }, [dispatch]);

  return (
    <Container className={classes.carouselContainer}>
      <Typography 
        component="h2" 
        variant="h4" 
        color="primary" 
        className={classes.sectionTitle}
      >
        Productos con descuento
      </Typography>
      
      <Divider style={{ marginBottom: 24 }} />
      
      {loading ? (
        <Box className={classes.loadingContainer}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Carousel
          itemPadding={[10, 20]}
          enableMouseSwipe={true}
          itemsToScroll={1}
          breakPoints={breakPoints}
          pagination={true}
          showArrows={true}
          transitionMs={700}
          easing="ease"
        >
          {discountProducts && discountProducts.length > 0 ? (
            discountProducts.map(p => (
              <Item key={p.id || p} product={p} />
            ))
          ) : (
            <Box className={classes.noProductsMessage}>
              <Typography variant="h6">No hay productos con descuento disponibles</Typography>
              <Typography variant="body2">Vuelve a revisar más tarde para ver nuevas ofertas</Typography>
            </Box>
          )}
        </Carousel>
      )}
    </Container>
  );
};
