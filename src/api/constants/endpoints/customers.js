/** @type Endpoint */
export const CREATE_CUSTOMER = {
    path: 'api/customers/create',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'name', type: String, default: '',  isRequired: true },
        { name: 'surname', type: String, default: '',  isRequired: true },
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'password', type: String, default: '',  isRequired: true },
        { name: 'ip_address', type: String, default: '1.1.1.1.',  isRequired: false },
        { name: 'avatar', type: String, default: null,  isRequired: false },
    ],
};

/** @type Endpoint */
export const LOGIN_CUSTOMER = {
    path: 'api/customers/login',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'password', type: String, default: '',  isRequired: true },
        { name: 'ip_address', type: String, default: '1.1.1.1.',  isRequired: false },
    ],
};

/** @type Endpoint */
export const CUSTOMER_FORGET_PASSWORD = {
    path: 'api/customers/forget-password',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'ip_address', type: String, default: '1.1.1.1.',  isRequired: false },
    ],
};

/** @type Endpoint */
export const CUSTOMER_ACTIVATION = {
    path: 'api/customers/activate',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'activation_key', type: Number, default: 0,  isRequired: true },
        { name: 'ip_address', type: String, default: '1.1.1.1.',  isRequired: false },
    ],
};