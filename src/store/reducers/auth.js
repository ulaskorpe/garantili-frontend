import {createReducer} from "@reduxjs/toolkit";
import {authLogin} from "../actions/auth";

const INITIAL_STATE = {};
const authReducer = createReducer(
    INITIAL_STATE,
    (builder) => {

        // Login
        builder.addCase(authLogin.type, (
            state,
            action,
        ) => {
            console.log(action, state);
        });

    }
)

export default authReducer;
