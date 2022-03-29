import {createReducer} from "@reduxjs/toolkit";
import {deleteTemp, setTemp} from "../actions/temp";

const INITIAL_STATE = {

};
const tempReducer = createReducer(
    INITIAL_STATE,
    (builder) => {

        // Set
        builder.addCase(setTemp.type, (
            state,
            action,
        ) => {
            if (
                !action.payload.key
                || typeof action.payload.key !== 'string'
                || typeof action.payload.value === 'undefined'
            ) return false;

            state[action.payload.key] = action?.payload?.value;
        });

        // Delete
        builder.addCase(deleteTemp.type, (
            state,
            action,
        ) => {
            if (
                !action.payload
                || typeof action.payload !== 'string'
                || typeof state[action.payload] === 'undefined'
            ) return false;

            delete state[action.payload];
        });

    }
)

export default tempReducer;
