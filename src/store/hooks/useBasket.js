import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import sweetAlert from 'sweetalert';
import { toast } from 'react-toastify';
import {basketClear, basketRemove, basketSetItemQuantity, setBasketWithFetchedData} from "../actions/basket";
import {useMutation} from "react-query";
import {DEFAULT_API_KEY, fetchThis, REMOVE_CART_ITEM_QUANTITY, UPDATE_CART_ITEM_QUANTITY} from "../../api";
import useAuth from "./useAuth";
import {getBasketItemsArrayList, getBasketTotalPrice} from "../selectors/basket";

const useBasket = () => {
    const dispatch = useDispatch();
    const { account, isGuest, isUser } = useAuth();

    const setBasketQuantityMutation = useMutation((data) => (
        fetchThis(
            UPDATE_CART_ITEM_QUANTITY,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));
    const removeFromBasketMutation = useMutation((data) => (
        fetchThis(
            REMOVE_CART_ITEM_QUANTITY,
            data,
            DEFAULT_API_KEY,
            {},
        )
    ));
    const setFetchedData = useCallback((item) => {
        dispatch(setBasketWithFetchedData(item));
    }, [dispatch]);

    const setItemQuantity = useCallback((
        itemID,
        quantity = 1
    ) => (e) => {
        if (e) e.preventDefault();
        if (!itemID) return false;
        if (!isUser && !isGuest) return false;

        let customer_id = '',
            guid = '';

        if (isUser) customer_id = account.customer_id;
        if (isGuest) guid = account.customer_id;

        setBasketQuantityMutation.mutate({
            customer_id,
            guid,
            quantity: quantity.toString(),
            item_code: itemID,
        }, {
            onSuccess: () => {
                // success
                dispatch(basketSetItemQuantity({itemID, quantity}))
                setBasketQuantityMutation.reset();
                toast('🎉 Adet başarıyla güncellendi!');
            },
            onError: () => {
                toast('Adet güncellenirken bir sorun ile karşılaşıldı!');
                setBasketQuantityMutation.reset();
            },
        });
    }, [dispatch, account, isUser, isGuest, setBasketQuantityMutation]);
    const remove = useCallback((itemID) => (e) => {
        if (e) e.preventDefault();
        if (!itemID) return false;
        if (!isUser && !isGuest) return false;

        let customer_id = '',
            guid = '';

        if (isUser) customer_id = account.customer_id;
        if (isGuest) guid = account.customer_id;

        sweetAlert({
            title: "Emin misin?",
            text: "Bu işlemi geri alamazsın. Sepete eklediğin ürünü silmiş olacaksın. Devam etmek istiyor musun?",
            icon: "warning",
            buttons: ['Hayır', 'Evet'],
            dangerMode: true,
        }).then((value) => {
            console.log(value)
            if (value) {
                removeFromBasketMutation.mutate({
                    customer_id,
                    guid,
                    item_code: itemID,
                }, {
                    onSuccess: () => {
                        // success
                        dispatch(basketRemove(itemID))
                        setBasketQuantityMutation.reset();
                        // success
                        toast("🗑️ Ürün, sepetinden kaldırıldı");
                    },
                    onError: () => {
                        toast('Adet güncellenirken bir sorun ile karşılaşıldı!');
                        setBasketQuantityMutation.reset();
                    },
                });
            }
        })

    }, [dispatch, account, isUser, isGuest, setBasketQuantityMutation, removeFromBasketMutation]);
    const clearLocalBasket = useCallback(() => {
        dispatch(basketClear())
    }, [dispatch])

    const totalPrice = useSelector(getBasketTotalPrice);
    const basketArray = useSelector(getBasketItemsArrayList);

    return ({
        totalPrice,
        clearLocalBasket,
        basketArray,
        setFetchedData,
        setItemQuantity,
        remove,
        quantityStats: {
            isLoading: setBasketQuantityMutation.isLoading,
            isError: setBasketQuantityMutation.isError,
        }
    });
};

export default useBasket;
