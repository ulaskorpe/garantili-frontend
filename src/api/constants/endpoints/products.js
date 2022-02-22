/** @type Endpoint */
export const GET_ALL_PRODUCTS = {
    path: 'api/products/all-products',
    method: 'POST',
    authRequired: true,
    body: [
        { name: 'min_price', type: Number, default: 0,  isRequired: false },
        { name: 'max_price', type: Number, default: 0,  isRequired: false },
        { name: 'brands', type: String, default: null,  isRequired: false },
        { name: 'colors', type: String, default: null,  isRequired: false },
        { name: 'memories', type: String, default: null,  isRequired: false },
        { name: 'page', type: Number, default: 0,  isRequired: false },
        { name: 'page_count', type: Number, default: 10,  isRequired: false },
        { name: 'order', type: String, default: null,  isRequired: false },
        { name: 'desc', type: String, default: null,  isRequired: false },
    ],
};