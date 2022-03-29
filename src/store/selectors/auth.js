import {createSelector} from "@reduxjs/toolkit";

export const selectUser = createSelector(
    (state) => state.auth,
    (account) => account,
);
