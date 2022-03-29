import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage";
import {useEffect, useMemo} from "react";
import useAuth from "../../store/hooks/useAuth";

export const AuthController = (props) => {
    /* Props */
    const {
        children,
        redirectTo = null,
        mustNotBeLoggedIn = false,
    } = props;

    /* react-router-dom Hooks */
    const location = useLocation();
    const navigate = useNavigate();

    /* Contexts */
    const {
        isLogged,
    } = useAuth();

    const ok = useMemo(() => {
        let condition = isLogged;
        if (mustNotBeLoggedIn && isLogged) condition = false;
        if (mustNotBeLoggedIn && !isLogged) condition = true;

        return condition;
    }, [mustNotBeLoggedIn, isLogged]);

    useEffect(() => {
        if (!ok && redirectTo) {
            navigate(redirectTo, { fromTo: location, replace: true });
        }
    }, [redirectTo, ok, navigate, location])

    if (ok) return children;
    if (!redirectTo) return <ErrorPage code={404} />;
    else return <></>;
};