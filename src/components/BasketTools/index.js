import React, {useEffect} from 'react';
import useAuth from "../../store/hooks/useAuth";
import {useMutation} from "react-query";
import {DEFAULT_API_KEY, fetchThis, SHOW_CART} from "../../api";
import {useSelector} from "react-redux";
import useTemp from "../../store/hooks/useTemp";
import useBasket from "../../store/hooks/useBasket";

const BasketTools = () => {
    const {
        rehydrated = false ,
    } = useSelector((state) => (
        state?._persist || { }
    ));
    const {
        temps = { fetchedBasket: false },
        setTemp,
    } = useTemp();
    const {
        setFetchedData
    } = useBasket()
    const {
        account,
        isGuest = false,
        isUser = false,
        createGuest = () => null,
    } = useAuth();


    const fetchBasketMutation = useMutation((data) => (
        fetchThis(
            SHOW_CART,
            data,
            DEFAULT_API_KEY,
            {}
        )
    ));

    useEffect(() => {
        if (
            createGuest
            && !isGuest
            && !isUser
        ) createGuest();
    }, [isGuest, isUser, createGuest]);

    useEffect(() => {
        if (
            rehydrated
            && !temps.fetchedBasket
            && (
                isGuest || isUser
            )
        ) {
            let guid = undefined,
                customer_id = undefined;

            // Misafir
            if (isGuest) {
                customer_id = undefined;
                guid = account.customer_id;
            }

            // Üye
            if (isUser) {
                customer_id = account.customer_id;
                guid = undefined;
            }

            if (
                !(
                    fetchBasketMutation.isLoading
                    || fetchBasketMutation.isError
                ) && (guid || customer_id)
            ) {
                fetchBasketMutation.mutate({
                    customer_id,
                    guid,
                }, {
                    onSuccess: ({ data }) => {
                        setFetchedData(
                            data?.cart_items
                            || []
                        )
                        setTemp('fetchedBasket', true)
                    },
                    onError: () => {
                        setTemp('fetchedBasket', true)
                    },
                });
            }
        }
    }, [
        rehydrated,
        account.customer_id,
        isGuest,
        isUser,
        setFetchedData,
        fetchBasketMutation,
        temps.fetchedBasket,
        setTemp
    ])

    return <></>;
};

export default BasketTools;
