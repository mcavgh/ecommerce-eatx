import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-slideshow-image';
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import 'react-slideshow-image/dist/styles.css'

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    transform: 'translateY(20px)',
    opacity: 0,
    animation: '$slideUp 0.8s ease-out forwards',
    animationDelay: '0.2s',
    margin: 0,
    padding: 0,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    display: 'block',
    lineHeight: 0, // Elimina el espacio debajo de la imagen
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: 1,
      pointerEvents: 'none',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },
  bannerImage: {
    width: '100%',
    height: 'auto',
    display: 'block', // Elimina el espacio inline por defecto
    margin: 0,
    padding: 0,
    border: 'none', // Elimina cualquier borde
    outline: 'none', // Elimina el outline
    verticalAlign: 'top', // Elimina el espacio baseline
    transition: 'transform 0.6s ease, filter 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      filter: 'brightness(1.1) contrast(1.1)',
    },
  },
  slideContainer: {
    margin: 0,
    padding: 0,
    '& .react-slideshow-container': {
      margin: 0,
      padding: 0,
      '& .images-wrap': {
        margin: 0,
        padding: 0,
      },
      '& .nav': {
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          background: 'rgba(255,255,255,1)',
          transform: 'scale(1.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        },
      },
      '& .indicators': {
        '& .each-slideshow-indicator': {
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          margin: '0 8px',
          transition: 'all 0.3s ease',
          '&.active': {
            background: theme.palette.primary.main,
            transform: 'scale(1.3)',
            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
          },
          '&:hover': {
            background: 'rgba(255,255,255,0.8)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  '@keyframes slideUp': {
    '0%': {
      transform: 'translateY(20px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
    '50%': {
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
    },
    '100%': {
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    },
  },
}));

const Banner = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const images = [banner1, banner2, banner3];
  
  const zoomOutProperties = {
    indicators: true,
    scale: 0.4,
    duration: 5000,
    transitionDuration: 800,
    infinite: true,
    prevArrow: (
      <div className="nav" style={{ left: '20px', zIndex: 2 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="nav" style={{ right: '20px', zIndex: 2 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={loaded} timeout={1500}>
        <Zoom  >
          {images.map((each, index) => (
            <div key={index}  style={{width: "100%", margin: 0, padding: 0}}>
              <img 
                className={classes.bannerImage}
                src={each} 
                alt={`Banner ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </Zoom>
    </Fade>
  );
};

export default Banner;



