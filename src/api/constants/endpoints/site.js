/** @type Endpoint */
export const GET_FAQ_LIST = {
    path: 'api/site/faq-list',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [],
    body: [],
};

/** @type Endpoint */
export const GET_NEW_LIST = {
    path: 'api/site/news/{start}/{len}',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [ 'start', 'len' ],
    body: [],
};

/** @type Endpoint */
export const GET_NEW_DETAIL = {
    path: 'api/site/news/{id}/1',
    method: 'GET',
    apiKeyRequired: true,
    pathVars: [ 'id' ],
    body: [],
};