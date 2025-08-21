import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useSelector } from "react-redux";
import { Typography, Box, Container, Divider, CircularProgress, Fade, Slide } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { getDiscountProducts } from '../../store/product/product.actions';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    transform: 'translateY(0)',
    transition: 'all 0.6s ease-in-out',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -10,
      left: 0,
      width: 0,
      height: 4,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 2,
      transition: 'width 0.8s ease-in-out 0.3s',
    },
    '&.animate': {
      '&:after': {
        width: 60,
      },
    },
  },
  carouselContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2, 0),
    minHeight: '400px', // Altura fija para evitar layout shift
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.8s ease-out',
    '&.animate': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  contentWrapper: {
    minHeight: '320px', // Altura fija para el contenido principal
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  noProductsMessage: {
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transform: 'scale(0.95)',
    transition: 'all 0.3s ease-in-out',
    minHeight: '200px', // Altura mínima para el mensaje
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:hover': {
      transform: 'scale(1)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '320px', // Misma altura que contentWrapper
    padding: theme.spacing(6),
  },
  carouselWrapper: {
    minHeight: '280px', // Altura fija para el carousel
    '& .rec-carousel-wrapper': {
      transition: 'all 0.3s ease',
    },
    '& .rec-arrow': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      },
      '&:disabled': {
        backgroundColor: theme.palette.grey[300],
        transform: 'scale(1)',
      },
    },
    '& .rec-dot': {
      backgroundColor: theme.palette.grey[400],
      transition: 'all 0.3s ease',
      '&.rec-dot_active': {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.2)',
      },
    },
  },
  fadeIn: {
    animation: '$fadeInUp 0.6s ease-out forwards',
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
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
  const [animate, setAnimate] = useState(false);
  const discountProducts = useSelector(state => state.productReducer?.discountProducts);
  const loading = useSelector(state => state.productReducer?.loading);

  useEffect(() => {
    dispatch(getDiscountProducts());
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Container className={`${classes.carouselContainer} ${animate ? 'animate' : ''}`}>
      <Slide direction="up" in={animate} timeout={600}>
        <Typography 
          component="h2" 
          variant="h4" 
          color="primary" 
          className={`${classes.sectionTitle} ${animate ? 'animate' : ''}`}
        >
          Productos con descuento
        </Typography>
      </Slide>
      
      <Fade in={animate} timeout={800}>
        <Divider style={{ marginBottom: 24 }} />
      </Fade>
      
      <div className={classes.contentWrapper}>
        {loading ? (
          <Fade in={loading} timeout={400}>
            <Box className={classes.loadingContainer}>
              <CircularProgress color="primary" />
            </Box>
          </Fade>
        ) : (
          <Fade in={!loading && animate} timeout={1000}>
            <Box className={classes.carouselWrapper}>
              <Carousel
                itemPadding={[10, 20]}
                enableMouseSwipe={true}
                itemsToScroll={1}
                breakPoints={breakPoints}
                pagination={true}
                showArrows={true}
                transitionMs={500}
                easing="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              >
                {discountProducts && discountProducts.length > 0 ? (
                  discountProducts.map((p, index) => (
                    <Fade 
                      key={p.id || p} 
                      in={animate} 
                      timeout={600 + (index * 100)}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <Item product={p} />
                      </div>
                    </Fade>
                  ))
                ) : (
                  <Slide direction="up" in={animate} timeout={800}>
                    <Box className={classes.noProductsMessage}>
                      <Typography variant="h6">No hay productos con descuento disponibles</Typography>
                      <Typography variant="body2">Vuelve a revisar más tarde para ver nuevas ofertas</Typography>
                    </Box>
                  </Slide>
                )}
              </Carousel>
            </Box>
          </Fade>
        )}
      </div>
    </Container>
  );
};
