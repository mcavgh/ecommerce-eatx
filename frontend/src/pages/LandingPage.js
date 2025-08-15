import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import { WishListProducts } from '../components/relatedProducts/WishListProducts';
import { DiscountProducts } from '../components/relatedProducts/DiscountProducts';
import Newsletter from '../components/newsletter/Newsletter';
import ParticleBackground from '../components/ParticleBackground/ParticleBackground';

export const LandingPage = (props) => {
    return (
        <>
            {/* Componente de partículas reutilizable */}
            <ParticleBackground 
                enableHover={true}
                animationSpeed={50}
            />
            
            <div>
                <AppBar />
                <Banner />
                <DiscountProducts/>
                <WishListProducts/>
                <Newsletter/>
                <Footer />
            </div>
        </>
    )
}