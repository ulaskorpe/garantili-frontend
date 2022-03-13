import { combineReducers } from 'redux';

//
import auth from "./auth";
import basket from "./basket";

export const rootReducer = combineReducers({
    auth,
    basket,
});
