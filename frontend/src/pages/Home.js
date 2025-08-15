import { createMuiTheme, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import Catalog from './catalog/Catalog';
import ParticleBackground from '../components/ParticleBackground/ParticleBackground';

export const Home = (props) => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Componente de partículas reutilizable */}
            <ParticleBackground 
                enableHover={true}
                animationSpeed={50}
            />
            
            {/* Contenido principal */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <AppBar />
                <Banner />
                <Catalog />
                <Footer />
            </div>
        </div>
    )
}