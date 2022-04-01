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
        { name: 'guid', type: String, default: '',  isRequired: false },
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

/** @type Endpoint */
export const CUSTOMER_RESEND_ACTIVE_CODE = {
    path: 'api/customers/resend-activate',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'ip_address', type: String, default: '1.1.1.1.',  isRequired: false },
    ],
};

/** @type Endpoint */
export const CUSTOMER_UPDATE_PASSWORD = {
    path: 'api/customers/update-password',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: Number, default: '',  isRequired: true },
        { name: 'current_password', type: String, default: '',  isRequired: true },
        { name: 'password', type: String, default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const CUSTOMER_UPDATE = {
    path: 'api/customers/update',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: Number, default: '',  isRequired: true },
        { name: 'name', type: String, default: '',  isRequired: true },
        { name: 'surname', type: String, default: '',  isRequired: true },
        { name: 'birthdate', type: String, default: '',  isRequired: true },
        { name: 'phone', type: String, default: '',  isRequired: true },
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'gender', type: 'any', default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const CONTACT_POST = {
    path: 'api/customers/contact-post',
    method: 'POST',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: 0,  isRequired: false },
        { name: 'guid', type: String, default: '',  isRequired: true },
        { name: 'name', type: String, default: '',  isRequired: true },
        { name: 'surname', type: String, default: '',  isRequired: true },
        { name: 'email', type: String, default: '',  isRequired: true },
        { name: 'phone_number', type: String, default: '',  isRequired: true },
        { name: 'subject', type: String, default: '',  isRequired: true },
        { name: 'message', type: String, default: '',  isRequired: true },
    ],
};