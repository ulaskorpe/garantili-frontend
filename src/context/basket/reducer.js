import {BASKET_SET, BASKET_REMOVE, INITIAL_BASKET_STATE, BASKET_UPDATE, BASKET_ADD} from "./constants";

export const basketLSKey = '_basket';

const setLS = (val) => {
    if (localStorage && localStorage?.setItem)
        localStorage.setItem(basketLSKey, val);
}

export const basketReducer = (
    prevState,
    action,
) => {
    switch (action.type) {
        case BASKET_SET: {
            setLS(JSON.stringify(action.payload));
            return action.payload;
        }

        case BASKET_UPDATE: {
            return INITIAL_BASKET_STATE;
        }

        case BASKET_ADD: {
            return INITIAL_BASKET_STATE;
        }

        case BASKET_REMOVE: {
            return INITIAL_BASKET_STATE;
        }

        default: {
            throw new Error('Bilinmeyen "action" değeri.');
        }
    }
}