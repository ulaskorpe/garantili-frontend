import {createAction} from "@reduxjs/toolkit";

export const setTemp = createAction(
    'temp/SET',
);

export const deleteTemp = createAction(
    'temp/DELETE',
);
