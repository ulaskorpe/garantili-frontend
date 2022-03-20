/** @type Endpoint */
export const GET_ARTICLES = {
    path: 'api/site/get-article',
    method: 'GET',
    apiKeyRequired: true,
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
