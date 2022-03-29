import { combineReducers } from 'redux';

//
import auth from "./auth";
import basket from "./basket";
import temp from "./temp";

export const rootReducer = combineReducers({
    auth,
    basket,
    temp,
});
