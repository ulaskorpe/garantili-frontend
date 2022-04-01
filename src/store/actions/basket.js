import {createAction} from "@reduxjs/toolkit";

export const setBasketWithFetchedData = createAction(
    'basket/SET_WITH_FETCHED_DATA',
);

export const basketAdd = createAction(
    'basket/ADD',
);

export const basketSetItemQuantity = createAction(
    'basket/SET_ITEM_QUANTITY',
);

export const basketRemove = createAction(
    'basket/REMOVE',
);

export const basketClear = createAction(
    'basket/CLEAR',
);
