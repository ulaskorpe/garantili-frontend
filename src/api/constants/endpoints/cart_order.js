/** @type Endpoint */
export const GET_ORDER_SUMMARY = {
    path: 'api/customers/cart/order-summary',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
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

/** @type Endpoint */
export const GET_ORDER_CODE = {
    path: 'api/customers/cart/get-order-code',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
    ],
};

/** @type Endpoint */
export const PLACE_ORDER = {
    path: 'api/customers/cart/place-order',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        /**/
        { name: 'customer_id', type: String, default: '',  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: false },
        { name: 'customer_address_id', type: String, default: '',  isRequired: false },
        { name: 'invoice_address_id', type: String, default: '',  isRequired: false },
        { name: 'cargo_company_id', type: String, default: '',  isRequired: true },
        { name: 'bank_id', type: String, default: '',  isRequired: true },
        { name: 'taksit', type: String, default: '',  isRequired: true },

        { name: 'amount', type: String, default: '0',  isRequired: true },
        { name: 'payment_method', type: String, default: '0',  isRequired: true },
        { name: 'receipt', type: 'file', default: null,  isRequired: false },

        /**/
        { name: 'delivery_full_name', type: String, default: '',  isRequired: false },
        { name: 'delivery_city_id', type: String, default: '',  isRequired: false },
        { name: 'delivery_phone', type: String, default: '',  isRequired: false },
        { name: 'delivery_address', type: String, default: '',  isRequired: false },

        /**/
        { name: 'invoice_full_name', type: String, default: '',  isRequired: false },
        { name: 'invoice_address', type: String, default: '',  isRequired: false },
        { name: 'invoice_phone', type: String, default: '',  isRequired: false },
        { name: 'invoice_city_id', type: String, default: '',  isRequired: false },
    ],
};