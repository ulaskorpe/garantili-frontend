/* */
export const LOCAL_API_URL = process.env?.REACT_APP_BASE_LOCAL || '';

/* */
export const PROD_API_URL = process.env?.REACT_APP_BASE  || '';

/* */
export const DEFAULT_AUTH_TOKEN = '5c35640a3da4f1e3970bacbbf7b20e6c';

/**/
export const API_URL = (
    (process.env?.NODE_ENV === 'development')
        ? LOCAL_API_URL
        : PROD_API_URL
);
