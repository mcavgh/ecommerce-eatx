import React from 'react';
import AppBar from '../../components/appBar/AppBar'
import Dashboard from '../../components/admin/adminOrders/Dashboard';

function PageCheckoutOrders(props) {
    return (
        <div>
            <AppBar/>
            <Dashboard/>
        </div>
    );
}

export default PageCheckoutOrders;