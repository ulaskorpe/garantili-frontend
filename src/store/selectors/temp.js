import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {selectSelf} from "./index";

export const getTemps = createDraftSafeSelector(
    selectSelf,
    (state) => state.temp,
);

