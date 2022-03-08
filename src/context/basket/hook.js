import {useContext} from "react";
import {BasketContext} from "./context";

export const useBasket = () => {
    const basket = useContext(BasketContext);

    if (typeof basket?.state === 'undefined') throw new Error('Basket verisi boş olamaz!');

    return basket;
}