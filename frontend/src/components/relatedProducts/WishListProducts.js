import React, { useEffect } from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useSelector } from "react-redux";
import { getUserWishList } from '../../store/user/user.action';
import { Typography } from '@material-ui/core/';
import { useDispatch } from "react-redux";
import axios from "axios"
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
];
export const WishListProducts = () => {
    const dispatch = useDispatch()

    const wishList = useSelector(state => state.userReducer?.wishList)
    const userId = useSelector(state => state.userReducer.userId.id)
    useEffect(() => {
        if (userId) dispatch(getUserWishList(userId))

    }, [])

    return (
        <>
            <Typography component="p" variant="h4" color="primary">
                Productos de su Wishlist
</Typography>
            <Carousel
                itemPadding={[50, 10]}
                enableMouseSwipe={true}
                itemsToScroll={2} breakPoints={breakPoints}

            >
                {
                    wishList && wishList[0] ? (

                        wishList.map(p => {
                            return <
                                
                            Item key={p.id} product={p} wishlist={true} />

                        })) : (<h1>no hay productos</h1>)
                }


            </Carousel>
        </>
    )
}
