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