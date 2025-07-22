import "./catalog.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory, searchProducts } from '../../store/category/category.actions';
import { Typography, makeStyles } from '@material-ui/core/';

// Estilos personalizados para la tipografía
const useStyles = makeStyles((theme) => ({
    categoryText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: '0.00938em',
        fontWeight: 500,
        lineHeight: 1.5,
        transition: 'all 0.3s ease',
        padding: '6px 8px',
        borderRadius: '4px',
        marginBottom: '4px',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.04)',
        },
    },
    activeText: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        background: 'rgba(0, 0, 0, 0.04)',
    }
}));

const FilterGeneres = () => {
    const classes = useStyles();
    const [active, setActive] = useState("");
    const dispatch = useDispatch();
    let categories = useSelector(state => state.categoryReducer.category);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleGenere = (e, category) => {
        setActive(category.name);
        dispatch(searchProducts(category.name));
    };

    return (
        <div>
            {categories && categories[0] && categories.map((category, index) => {
                if (category.name !== "") {
                    return (
                        <Typography 
                            variant="subtitle1" 
                            key={index} 
                            name={category.name}
                            onClick={(e) => { handleGenere(e, category) }}
                            className={`${classes.categoryText} ${active === category.name ? classes.activeText : ''}`}
                        >
                            {category.name}
                        </Typography>
                    );
                }
                return "";
            })}
        </div>
    );
};

export default FilterGeneres;
