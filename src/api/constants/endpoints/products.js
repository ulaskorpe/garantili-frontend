/** @type Endpoint */
export const GET_ALL_PRODUCTS = {
    path: 'api/products/all-products',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'min_price', type: Number, default: 0,  isRequired: false },
        { name: 'max_price', type: Number, default: 0,  isRequired: false },
        { name: 'brands', type: String, default: '',  isRequired: false },
        { name: 'colors', type: String, default: '',  isRequired: false },
        { name: 'memories', type: String, default: '',  isRequired: false },
        { name: 'page', type: Number, default: 1,  isRequired: false },
        { name: 'page_count', type: Number, default: 10,  isRequired: false },
        { name: 'order', type: String, default: 'id',  isRequired: false },
        { name: 'desc', type: String, default: 'asc',  isRequired: false },
    ],
};

/** @type Endpoint */
export const GET_PRODUCT_FILTERS = {
    path: 'api/products/product-filters',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_PRODUCT_DETAIL = {
    path: 'api/products/product-detail/{id}',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [ 'id' ],
    body: [],
};
