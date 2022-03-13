import {createSelector} from "@reduxjs/toolkit";

export const userIsLogged = createSelector(
    (state) => state.auth,
    (account) => {
        if (!account) return false;
        return (typeof account.customer_id !== 'undefined');
    }
);
