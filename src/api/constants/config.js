/* */
export const LOCAL_API_URL = process.env?.REACT_APP_BASE_LOCAL || '';

/* */
export const PROD_API_URL = process.env?.REACT_APP_BASE  || '';

/**/
export const API_URL = (
    (process.env?.NODE_ENV === 'development')
        ? LOCAL_API_URL
        : PROD_API_URL
);
