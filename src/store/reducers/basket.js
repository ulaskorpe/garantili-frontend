import {createReducer} from "@reduxjs/toolkit";
import {
    basketAdd,
    basketRemove,
    basketSetItemQuantity,
    setBasketWithFetchedData
} from "../actions/basket";

const INITIAL_STATE = {
    items: {},
};
const basketReducer = createReducer(
    INITIAL_STATE,
    (builder) => {

        //
        builder.addCase(setBasketWithFetchedData.type, (
            state,
            action,
        ) => {
            if (
                !Array.isArray(action.payload)
                || !action.payload.length
            ) return;

            action.payload.forEach((basketItem) => {
                if (!basketItem?.item_code) return;
                state.items[basketItem.item_code] = basketItem;
            })
        });

        //
        builder.addCase(basketAdd.type, (
            state,
            action,
        ) => {
            const stateVal = state.items[action.payload.id];
            let isAlreadyDefined = Boolean(stateVal);

            let val = action.payload;
            if (isAlreadyDefined) {
                stateVal.quantity += 1;
            } else {
                val.quantity = 1;
                state.items[action.payload.id] = val;
            }
        });

        //
        builder.addCase(basketSetItemQuantity.type, (
            state,
            action,
        ) => {
            const {
                itemID,
                quantity,
            } = action.payload;

            if (
                typeof itemID === 'undefined'
                || typeof quantity === 'undefined'
            ) return false;

            const item = state.items[itemID];
            if (!item) return false;

            if (quantity > 0) {
                state.items[itemID].quantity = quantity;
            } else delete state.items[itemID];
        });

        //
        builder.addCase(basketRemove.type, (
            state,
            action,
        ) => {
            if (state.items[action.payload]) delete state.items[action.payload];
        });

    }
)

export default basketReducer;
