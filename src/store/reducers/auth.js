import {createReducer} from "@reduxjs/toolkit";
import {authLogin, authLogOut} from "../actions/auth";

const INITIAL_STATE = {};
const authReducer = createReducer(
    INITIAL_STATE,
    (builder) => {

        // Login
        builder.addCase(authLogin.type, (
            state,
            action,
        ) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        });

        // LogOut
        builder.addCase(authLogOut.type, () => INITIAL_STATE);

    }
)

export default authReducer;
