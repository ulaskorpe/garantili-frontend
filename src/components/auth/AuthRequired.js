import { useNavigate, useLocation } from 'react-router-dom';
import {INITIAL_AUTH_STATE, useAuth} from "../../context/auth";
import ErrorPage from "../pages/ErrorPage";

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
        state = INITIAL_AUTH_STATE,
    } = useAuth();

    const isLogged = state && typeof state.id === 'undefined';

    let ok = isLogged;
    if (mustNotBeLoggedIn && isLogged) ok = false;
    if (mustNotBeLoggedIn && !isLogged) ok = true;

    if (ok) return children;

    if (redirectTo) navigate(redirectTo, { fromTo: location, replace: true });
    else return (
        <ErrorPage code={404} />
    );
};