import React, { useEffect } from 'react';
import 'swiper/swiper-bundle.min.css';
import CategoryComponent from './CategoryComponent'
import { useDispatch, useSelector } from 'react-redux'
import {getCategory} from '../../store/category/category.actions'
import { useStyles } from './styleCategory'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, EffectCoverflow, Autoplay } from 'swiper';
import LinearProgress from '@material-ui/core/LinearProgress';

SwiperCore.use([Pagination, Navigation, EffectCoverflow, Autoplay]);

export default function CatalogComponent() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryReducer.category)

    const checkCategory = (categories) => {
        if (categories && categories[0]) {
            let categoryList = []
            for (let i in categories) {
                if (categoryList.find(e => e === categories[i].name)) {
                    continue
                } else {
                    categoryList.push(categories[i].name)
                }
            }
            return categoryList
        }
    }

    let categoryList = checkCategory(categories)
    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch]);

    const classes = useStyles();

    return (
        <div className={classes.root}>

            {(!categories || !categories[0]) ? (
                <div className={classes.loader}>
                    <LinearProgress />
                    <LinearProgress color="primary" />
                </div>
            ) : (
                <Swiper className={classes.root}
                    centeredSlides
                     loop
                    autoplay={{ delay: 500 }}
                    slidesPerView={3}
                >
                    {(categories) && (categories[0]) &&
                        categoryList.map(categoryList => {
                            return <SwiperSlide className={classes.root}>
                                <CategoryComponent title={categoryList} />
                            </SwiperSlide>
                        })}
                </Swiper>
            )}
        </div>
    );
}