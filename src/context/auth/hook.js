import {useContext} from "react";
import {AuthContext} from "./context";

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if (typeof auth?.state === 'undefined') throw new Error('Auth verisi boş olamaz!');

    return auth;
}