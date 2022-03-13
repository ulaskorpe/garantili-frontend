import {useCallback} from "react";
import useRouterDOM from "./useRouterDOM";

const useProductTools = () => {
    const {
        go,
    } = useRouterDOM();

    const goProduct = useCallback((product, replace) => {
        const path = product.url;
        go(path, replace);
    }, [go]);

    const goProductEvent = useCallback((...args) => (e) => {
        e.preventDefault();
        goProduct(...args);
    }, [goProduct]);

    return ({
        goProduct,
        goProductEvent,
    });
};

export default useProductTools;
