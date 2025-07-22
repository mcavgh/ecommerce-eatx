import React, { useState, useEffect } from "react";
import InputBase from '@material-ui/core/InputBase';
import { useStyles } from '../styles'
import { useDispatch } from 'react-redux'
import { searchProducts, getProducts } from '../../../store/product/product.actions';
import { useHistory } from "react-router-dom";
export const SearchBar = () => {
    const history= useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    const handleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
        if (event.target.value.length === 1 ||
            event.target.value.length % 4 === 0 &&
            event.target.value.length < 10 &&
            event.target.value[0]) {
                dispatch(searchProducts(event.target.value))
        }
    }

    useEffect(() => { dispatch(getProducts()) }, [dispatch]);

    return (
        <>
            <form >
                <InputBase onClick={(e)=> history.push("/home")} classes={{ root: classes.inputRoot, input: classes.inputInput, }} inputProps={{ 'aria-label': 'search' }} type="text" id="title" value={title} onChange={(e) => handleChange(e)}
                />
            </form>
        </>
    );

}
