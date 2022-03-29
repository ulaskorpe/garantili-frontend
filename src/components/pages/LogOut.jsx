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
        clear,
    } = useBasket();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLogged && logOut) {
            logOut();
            if (clear) clear()
            navigate('/', { fromTo: location, replace: true });
        }
    }, [isLogged, logOut, clear, navigate, location]);
    return <></>;
};

export default LogOut;