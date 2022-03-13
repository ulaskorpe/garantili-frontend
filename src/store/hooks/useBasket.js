import {useDispatch} from "react-redux";
import {useCallback} from "react";
import { toast } from 'react-toastify';
import {basketAdd, basketRemove, basketSet, basketSetItemQuantity} from "../actions/basket";

const useBasket = () => {
    const dispatch = useDispatch();

    const set = useCallback((item) => (e) => {
        e.preventDefault();

        if (!item.id) return false;

        dispatch(basketSet(item));

        // success
        toast('🎉 Sepet başarıyla ayarlandı!');
    }, [dispatch]);
    const add = useCallback((item) => (e) => {
        e.preventDefault();

        if (!item.id) return false;

        dispatch(basketAdd(item));

        // success
        toast('🎉 Ürün, sepetine eklendi!');
    }, [dispatch]);

    const setItemQuantity = useCallback((
        itemID,
        quantity
    ) => (e) => {
        e.preventDefault();
        if (!itemID) return false;

        dispatch(basketSetItemQuantity({
            itemID,
            quantity,
        }));

        // success
        toast('🎉 Adet başarıyla güncellendi!');
    }, [dispatch]);
    const clear = useCallback((e) => {
        e.preventDefault();

        // success
        toast('clearBasket');
    }, [dispatch]);
    const remove = useCallback((itemID) => (e) => {
        e.preventDefault();
        if (!itemID) return false;

        dispatch(basketRemove(itemID));

        // success
        toast("🗑️ Ürün, sepetinden kaldırıldı");
    }, [dispatch]);

    return ({
        set,
        add,
        setItemQuantity,
        clear,
        remove,
    });
};

export default useBasket;
