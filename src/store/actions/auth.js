import {createAction} from "@reduxjs/toolkit";

export const authLogin = createAction(
    'auth/LOGIN',
);

export const authLogOut = createAction(
    'auth/LOG_OUT',
);