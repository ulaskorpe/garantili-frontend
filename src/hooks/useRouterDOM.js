import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback} from "react";

const useRouterDOM = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const go = useCallback((path, replace = false) => {
        if (!path) return;
        if (path === location.pathname) return;

        navigate(
            path,
            {
                replace,
                fromTo: location,
            }
        );
    }, [location, navigate]);
    const goWithState = useCallback((path, state, replace = false) => {
        if (!path) return;
        if (path === location.pathname) return;

        navigate(
            path,
            {
                replace,
                state,
                fromTo: location,
            }
        );
    }, [location, navigate]);
    const goEvent = useCallback((...args) => (e) => {
        e.preventDefault();
        go(...args);
    }, [go]);

    return ({
        go,
        goWithState,
        goEvent,
        params,
    });
};

export default useRouterDOM;
