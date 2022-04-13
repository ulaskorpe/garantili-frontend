import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../store/hooks/useAuth";
import useBasket from "../../store/hooks/useBasket";

const LogOut = () => {
    const {
        isLogged,
        logOut,
    } = useAuth();
    const {
        clearLocalBasket,
    } = useBasket();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLogged && logOut) {
            logOut();
            if (clearLocalBasket) clearLocalBasket()
            navigate('/', { fromTo: location });
        }
    }, [isLogged, logOut, clearLocalBasket, navigate, location]);
    return <></>;
};

export default LogOut;