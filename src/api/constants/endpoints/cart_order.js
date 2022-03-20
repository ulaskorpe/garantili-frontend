/** @type Endpoint */
export const GET_ORDER_SUMMARY = {
    path: 'api/customers/cart/order-summary',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'order_id', type: String, default: '',  isRequired: true },
    ],
};

export const GET_ORDER_LIST = {
    path: 'api/customers/cart/order-history',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'page', type: Number, default: 1,  isRequired: false },
        { name: 'page_count', type: Number, default: 10,  isRequired: false },
    ],
};
