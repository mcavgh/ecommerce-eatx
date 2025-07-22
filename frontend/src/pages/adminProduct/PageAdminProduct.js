import  React,{useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import MaterialTable from 'material-table'
import { deleteProductById,getProducts } from '../../store/product/product.actions';
import { useHistory } from "react-router-dom"
import { Paper} from '@material-ui/core';
import AppBar from "../../components/appBar/AppBar"
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
export function PageAdminProduct() {
    const products = useSelector(state => state.productReducer.products)
    const dispatch = useDispatch()
    const history = useHistory ();
  
    useEffect(() => {
        dispatch(getProducts())        
    }, [dispatch])

    return (
        <div>
            <AppBar/>
            <Paper>
            <MaterialTable
             
                columns={[
                    { title: "ID", field: "id" },
                    { title: "Name", field: "name" },
                    //{ title: "Description", field: "description" },
                    { title: "Price", field: "price", type: "numeric" },
                    { title: "Stock", field: "stock", type: "numeric" },
                ]}
                data={products}
                title="Products"
                actions={[
                    {
                        icon: MoneyOffIcon,
                        tooltip: 'discount',
                        onClick: (event, rowData) => history.push ('/discountProduct/'+ rowData.id)
                    },
                    {
                        icon: 'edit',
                        tooltip: 'edita',
                        onClick: (event, rowData) => history.push ('/editProduct/'+ rowData.id)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete',
                        onClick: (event, rowData) => {
                            dispatch(deleteProductById(rowData.id))
                        }
                    }
                ]}
                />
                </Paper>
        </div>
    );
}

