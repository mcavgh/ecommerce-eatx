import { createMuiTheme, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import Catalog from './catalog/Catalog';
// import { useSelector } from "react-redux";
// import Catalog from '../components/Product/catalog/Catalog';

export const Home = (props) => {



    return (
        <div>
            <AppBar />
            <Banner />
            <Catalog />
            <Footer />
        </div>
    )
}