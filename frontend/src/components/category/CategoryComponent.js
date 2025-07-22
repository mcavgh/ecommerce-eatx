import React from 'react';
import { useStyles } from './styleButton'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import { searchProducts } from '../../store/category/category.actions'
import { Grid} from '@material-ui/core/';

function CategoryComponent({ title }) {
    const dispatch = useDispatch()

    const sendCategorySearch = (title) => {
        dispatch(searchProducts(title))
    }

    const classes = useStyles();
    return (
        <Grid>
            <div className={classes.container}>
                <Button className={classes.button} classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-root-x`
                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                }} title={title} onClick={() => sendCategorySearch(title)} >{!title ? 'otra categoria' : title}
                </Button>
            </div>
        </Grid>
    );
}

export default CategoryComponent;