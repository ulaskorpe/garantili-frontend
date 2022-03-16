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