import React from 'react';
import AppBar from '../../components/appBar/AppBar'
import AdminAddCategories from '../../components/admin/adminCategories/AdminAddCategories'

function PageAddProduct(props) {
    return (
        <div>
            <AppBar/>
            <AdminAddCategories/>
        </div>
    );
}

export default PageAddProduct;