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

/** @type Endpoint */
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

/** @type Endpoint */
export const SHOW_CART = {
    path: 'api/customers/cart/show',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
    ],
};

/** @type Endpoint */
export const ADD_CART = {
    path: 'api/customers/cart/add',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
        { name: 'product_id', type: String, default: '',  isRequired: true },
        { name: 'memory_id', type: String, default: '',  isRequired: true },
        { name: 'color_id', type: String, default: '',  isRequired: true },
        { name: 'quantity', type: String, default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const UPDATE_CART_ITEM_QUANTITY = {
    path: 'api/customers/cart/update',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
        { name: 'item_code', type: String, default: '',  isRequired: true },
        { name: 'quantity', type: String, default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const REMOVE_CART_ITEM_QUANTITY = {
    path: 'api/customers/cart/remove',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
        { name: 'item_code', type: String, default: '',  isRequired: true },
    ],
};