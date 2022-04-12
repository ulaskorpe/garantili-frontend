/** @type Endpoint */
export const GET_ARTICLES = {
    path: 'api/site/get-article',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_FAQ_LIST = {
    path: 'api/site/faq-list',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_SUPER_OFFER = {
    path: 'api/site/super-offer',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_NEW_LIST = {
    path: 'api/site/news/{start}/{len}(?query:/){query}',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [ 'start', 'len', '?query' ],
    body: [],
};

/** @type Endpoint */
export const GET_NEW_DETAIL = {
    path: 'api/site/news-detail/{id}',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [ 'id' ],
    body: [],
};

/** @type Endpoint */
export const GET_CITIES = {
    path: 'api/get-cities',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};


/** @type Endpoint */
export const GET_TOWNS = {
    path: 'api/get-towns/{city_id}',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [ 'city_id' ],
    body: [],
};

/** @type Endpoint */
export const GET_DISTRICTS = {
    path: 'api/get-districts/{town_id}',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [ 'town_id' ],
    body: [],
};

/** @type Endpoint */
export const GET_NEIGHBORHOODS = {
    path: 'api/get-neighborhoods/{district_id}',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [ 'district_id' ],
    body: [],
};

/** @type Endpoint */
export const GET_BANK_ACCOUNTS = {
    path: 'api/bank-accounts',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_CARGO_COMPANIES = {
    path: 'api/cargo-companies',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_INSTALLMENTS = {
    path: 'api/bankalar-taksitler/{bank_id}',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [ 'bank_id' ],
    body: [],
};

/** @type Endpoint */
export const GET_CONTACT_INFO = {
    path: 'api/contact-info',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_TOP_MENU = {
    path: 'api/site/top-menu',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_BANK_LIST = {
    path: 'api/bankalar-list',
    method: 'GET',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const CALC_INSTALLMENT_FEE = {
    path: 'api/banka-taksit-hesapla',
    method: 'POST',
    apiKeyRequired: true,
    doNotCheckStatus: true,
    pathVars: [],
    body: [
        { name: 'banka_id', type: String, default: '',  isRequired: true },
        { name: 'taksit', type: String, default: '',  isRequired: true },
        { name: 'tutar', type: String, default: '',  isRequired: true },
    ],
};
