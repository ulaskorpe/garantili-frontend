import {AUTH_SET, AUTH_LOGOUT, INITIAL_AUTH_STATE} from "./constants";

export const authReducer = (
    prevState,
    action,
) => {
    switch (action.type) {
        case AUTH_SET: {
            return action.payload;
        }

        case AUTH_LOGOUT: {
            return INITIAL_AUTH_STATE;
        }

        default: {
            throw new Error('Bilinmeyen "action" değeri.');
        }
    }
}