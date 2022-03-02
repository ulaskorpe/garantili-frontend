import {AUTH_LOGIN, AUTH_LOGOUT, INITIAL_AUTH_STATE} from "./constants";

export const authReducer = (
    prevState,
    action,
) => {
    switch (action.type) {
        case AUTH_LOGIN: {
            return {
                access_token: action.payload.access_token,
                user: action.payload.user
            };
        }

        case AUTH_LOGOUT: {
            return INITIAL_AUTH_STATE;
        }

        default: {
            throw new Error('Bilinmeyen "action" değeri.');
        }
    }
}