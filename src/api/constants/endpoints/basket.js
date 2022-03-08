/** @type Endpoint */
export const SHOW_BASKET = {
    path: 'api/customers/cart/show',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: Number, default: '',  isRequired: true },
    ],
};