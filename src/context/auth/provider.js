import {useMemo, useReducer} from "react";
import {authReducer} from "./reducer";
import {AuthContext} from "./context";
import {AUTH_LOGIN, AUTH_LOGOUT, INITIAL_AUTH_STATE} from "./constants";

export const AuthProvider = ({ children }) => {
    const [
        state,
        dispatch = (action) => null
    ] = useReducer(authReducer, INITIAL_AUTH_STATE);

    const value = useMemo(() => ({
        state,
        dispatch,
        login (payload) {
            dispatch({
                type: AUTH_LOGIN,
                payload,
            });
        },
        logout (payload) {
            dispatch({
                type: AUTH_LOGOUT,
                payload: INITIAL_AUTH_STATE,
            });
        },
    }), [state, dispatch]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}