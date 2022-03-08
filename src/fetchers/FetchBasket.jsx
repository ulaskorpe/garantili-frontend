import React, {useEffect} from 'react';
import {useAuth} from "../context";
import {useQuery} from "react-query";
import {DEFAULT_API_KEY, fetchThis, retry} from "../api";
import {SHOW_BASKET} from "../api/constants/endpoints/basket";
import {useBasket} from "../context/basket";

const FetchBasket = () => {
    const {
        isLogged = false,
        state: user = {},
    } = useAuth();
    const {
        state: localBasket = [],
        set: setBasket,
    } = useBasket();

    const basket = useQuery(
        ['get-baset-in-root'],
        () => (
            fetchThis(
                SHOW_BASKET,
                {
                    customer_id: parseInt(user.customer_id || '0'),
                },
                DEFAULT_API_KEY,
                {},
            )
        ),
        { retry, refetchOnWindowFocus: false, enabled: isLogged }
    );

    useEffect(() => {
        const sBasket = basket?.data?.data?.cart_items;
        if (
            isLogged
            && basket.isSuccess
            && basket.data.status
            && Array.isArray(sBasket)
        ) {
            if (
                JSON.stringify(localBasket) !== JSON.stringify(sBasket)
            ) {
                setBasket(sBasket);
            }
        }
    }, [basket, localBasket, isLogged])

    return <></>;
};

export default FetchBasket;