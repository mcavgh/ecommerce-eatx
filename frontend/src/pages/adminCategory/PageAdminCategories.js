import  React,{useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import MaterialTable from 'material-table'
import { putDeleteCategory,getCategory } from '../../store/category/category.actions';
import { useHistory } from "react-router-dom"
import { Paper} from '@material-ui/core';
import AppBar from "../../components/appBar/AppBar"

export function PageAdminCategories() {
    const categories = useSelector(state => state.categoryReducer.category)
    const dispatch = useDispatch()
    const history = useHistory ();
  
    useEffect(() => {
        dispatch(getCategory())        
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
                data={categories}
                title="categories"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'edita',
                        onClick: (event, rowData) => history.push ('/editCategory/'+ rowData.id)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete',
                        onClick: (event, rowData) => {
                            dispatch(putDeleteCategory(rowData.id))
                        }
                    }
                ]}
                />
                </Paper>
        </div>
    );
}

