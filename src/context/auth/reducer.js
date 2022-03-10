import {AUTH_SET, AUTH_LOGOUT, INITIAL_AUTH_STATE, AUTH_UPDATE} from "./constants";

const setAuthStorage = (val) => {
    if (localStorage && localStorage.setItem) {
        localStorage.setItem('_u', JSON.stringify(val));
    }
}
const removeAuthStorage = () => {
    if (localStorage && localStorage.setItem) {
        localStorage.removeItem('_u');
    }
}

export const authReducer = (
    prevState,
    action,
) => {
    switch (action.type) {
        case AUTH_SET: {
            setAuthStorage(action.payload);
            return action.payload;
        }
        case AUTH_UPDATE: {
            const newValue = {
                ...prevState,
                ...action.payload,
            };
            setAuthStorage(newValue);
            return newValue;
        }
        case AUTH_LOGOUT: {
            removeAuthStorage();
            return INITIAL_AUTH_STATE;
        }

        default: {
            throw new Error('Bilinmeyen "action" değeri.');
        }
    }
}