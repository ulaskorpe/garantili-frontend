import React, {useMemo, useReducer} from "react";
import {authReducer} from "./reducer";
import {AuthContext} from "./context";
import {AUTH_SET, AUTH_LOGOUT, INITIAL_AUTH_STATE} from "./constants";

export const AuthProvider = ({ children }) => {
    const [
        state,
        dispatch = (action) => null
    ] = useReducer(authReducer, INITIAL_AUTH_STATE);

    const localData = localStorage?.getItem('_u')
    if (
        localData
        && JSON.stringify(state) !== localData
    ) {
        const payload = JSON.parse(localData);
        if (Object.keys(payload).length) {
            dispatch({
                type: AUTH_SET,
                payload: payload,
            });
        }
    }

    const isLogged = useMemo(() => (
        Boolean(state && !(typeof state.customer_id === 'undefined'))
    ), [state]);

    const value = useMemo(() => ({
        state,
        isLogged,
        dispatch,
        login (payload) {
            localStorage.setItem('_u', JSON.stringify(payload));
            dispatch({
                type: AUTH_SET,
                payload,
            });
        },
        logout (payload) {
            localStorage.removeItem('_u');
            dispatch({
                type: AUTH_LOGOUT,
                payload: INITIAL_AUTH_STATE,
            });
        },
    }), [state, dispatch, isLogged]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}