import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {selectSelf} from "./index";

export const getItemPrice = (item) => (
    parseFloat(item.listPrice || item.price)
)

const BINLIK_AYRACI = ',';
export const ayir = (count = 0) => {
    if (typeof count !== 'number') count = parseFloat(count);
    if (!count) return 0;

    if (!(
        count !== count.toFixed(2)
    )) count = count.toFixed(2);

    let deg = count;
    if (count > 999) {
        let q = count.toFixed(2).toString().split('.');
        deg = q[0].replace(/\B(?=(\d{3})+(?!\d))/g, BINLIK_AYRACI);
        if (q[1]) deg += `.${q[1]}`;
    }

    if (deg?.toFixed) deg = deg.toFixed(2)

    return deg;
}

export const getBasketObject = createDraftSafeSelector(
    selectSelf,
    state => state.basket
);

export const getBasketItemsObject = createDraftSafeSelector(
    selectSelf,
    state => state.basket.items
);

export const getBasketItemsArrayList = createDraftSafeSelector(
    getBasketItemsObject,
    (basket = {}) => {
        let basketList = [];

        Object.entries(basket).forEach(([_, basketItem]) => {
            basketList.push(basketItem);
        });

        return basketList;
    }
);

export const getSplitBasketTotalPrice = createDraftSafeSelector(
    getBasketItemsObject,
    (basket = {}) => {
        let total = 0;

        Object.entries(basket).forEach(([_, basketItem]) => {
            total+= getItemPrice(basketItem);
        });

        return ayir(total);
    }
);
export const getBasketTotalPrice = createDraftSafeSelector(
    getBasketItemsObject,
    (basket = {}) => {
        let total = 0;

        Object.entries(basket).forEach(([_, basketItem]) => {
            total+= getItemPrice(basketItem);
        });

        return total;
    }
);

export const getBasketCount = createDraftSafeSelector(
    getBasketItemsObject,
    (basket = {}) => (
        Object.keys(basket).length
    )
);

