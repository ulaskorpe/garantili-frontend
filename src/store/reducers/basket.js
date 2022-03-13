import {createReducer} from "@reduxjs/toolkit";
import {basketAdd, basketRemove, basketSet, basketSetItemQuantity} from "../actions/basket";

const INITIAL_STATE = {};
const basketReducer = createReducer(
    INITIAL_STATE,
    (builder) => {
        //
        builder.addCase(basketSet.type, (
            state,
            action,
        ) => {
            console.log(action, state);
        });

        //
        builder.addCase(basketAdd.type, (
            state,
            action,
        ) => {
            const stateVal = state[action.payload.id];
            let isAlreadyDefined = Boolean(stateVal);

            let val = action.payload;
            if (isAlreadyDefined) {
                val = stateVal;
                stateVal.quantity += 1;
            } else {
                val.quantity = 1;
                state[action.payload.id] = val;
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

            const item = state[itemID];
            if (!item) return false;

            if (quantity > 0) {
                state[itemID].quantity = quantity;
            } else delete state[itemID];
        });

        //
        builder.addCase(basketRemove.type, (
            state,
            action,
        ) => {
            if (state[action.payload]) delete state[action.payload];
        });

    }
)

export default basketReducer;
