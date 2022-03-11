import React, {useMemo, useReducer} from "react";
//import {useMemo, useReducer} from "react";
import {basketReducer} from "./reducer";
import {BasketContext} from "./context";
import {BASKET_SET, INITIAL_AUTH_STATE} from "./constants";

export const BasketProvider = ({ children }) => {
    const [
        state,
        dispatch = (action) => null
    ] = useReducer(basketReducer, INITIAL_AUTH_STATE);

    const localData = localStorage?.getItem('_basket')
    if (
        localData
        && JSON.stringify(state) !== localData
    ) {
        const payload = JSON.parse(localData);
        if (Object.keys(payload).length) {
            dispatch({
                type: BASKET_SET,
                payload,
            });
        }
    }

    const value = useMemo(() => ({
        state,
        dispatch,
        set (payload) {
            dispatch({
                type: BASKET_SET,
                payload,
            })
        }
    }), [state, dispatch]);

    return (
        <BasketContext.Provider value={value}>
            {children}
        </BasketContext.Provider>
    );
}