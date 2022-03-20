/** @type Endpoint */
export const SHOW_ADDRESSES = {
    path: 'api/customers/address/show',
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
export const GET_ADDRESS = {
    path: 'api/customers/address/get',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'address_id', type: String, default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const DELETE_ADDRESS = {
    path: 'api/customers/address/delete',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'address_id', type: String, default: '',  isRequired: true },
    ],
};

/** @type Endpoint */
export const ADD_ADDRESS = {
    path: 'api/customers/address/add',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'title', type: String, default: '',  isRequired: true },
        { name: 'name_surname', type: String, default: '',  isRequired: true },
        { name: 'city_id', type: 'any', default: '',  isRequired: true },
        { name: 'town_id', type: 'any', default: '',  isRequired: true },
        { name: 'district_id', type: 'any', default: '',  isRequired: true },
        { name: 'neighborhood_id', type: 'any', default: '',  isRequired: true },
        { name: 'address', type: String, default: '',  isRequired: true },
        { name: 'phone_number', type: String, default: '',  isRequired: true },
        { name: 'phone_number_2', type: String, default: '',  isRequired: false },
        { name: 'is_first', type: Number, default: 0,  isRequired: false },
    ],
};

/** @type Endpoint */
export const UPDATE_ADDRESS = {
    path: 'api/customers/address/update',
    method: 'POST',
    apiKeyRequired: true,
    pathVars: [],
    body: [
        { name: 'customer_id', type: String, default: '',  isRequired: true },
        { name: 'address_id', type: String, default: '',  isRequired: true },
        { name: 'title', type: String, default: '',  isRequired: true },
        { name: 'name_surname', type: String, default: '',  isRequired: true },
        { name: 'city_id', type: 'any', default: '',  isRequired: true },
        { name: 'town_id', type: 'any', default: '',  isRequired: true },
        { name: 'district_id', type: 'any', default: '',  isRequired: true },
        { name: 'neighborhood_id', type: 'any', default: '',  isRequired: true },
        { name: 'address', type: String, default: '',  isRequired: true },
        { name: 'phone_number', type: String, default: '',  isRequired: true },
        { name: 'phone_number_2', type: String, default: '',  isRequired: false },
        { name: 'is_first', type: Number, default: 0,  isRequired: false },
    ],
};