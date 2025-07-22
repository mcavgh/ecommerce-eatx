import React from 'react';
import EditCategory from '../../components/admin/adminCategories/EditCategory'
import AppBar from '../../components/appBar/AppBar'

function PageEditCategory(props) {
    return (
        <div>
            <AppBar/>
            <EditCategory/>
        </div>
    );
}

export default PageEditCategory;