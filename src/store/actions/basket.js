import {createAction} from "@reduxjs/toolkit";

export const basketSet = createAction(
    'basket/SET',
);

export const basketAdd = createAction(
    'basket/ADD',
);

export const basketSetItemQuantity = createAction(
    'basket/DECREASE',
);

export const basketClear = createAction(
    'basket/CLEAR',
);

export const basketRemove = createAction(
    'basket/REMOVE',
);
