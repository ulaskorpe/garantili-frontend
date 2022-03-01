/**
 * @typedef {boolean | undefined} OptionalBoolean
 * @typedef {string | undefined} OptionalString
 * @typedef {"POST" | "GET"} RequestMethods
 * @typedef {any | undefined} AnyOrUndefined
 */

/**
 * @typedef {Object} EndpointBody
 * @readonly
 * @property {string} name
 * @property {any} type
 * @property {AnyOrUndefined} default
 * @property {OptionalBoolean} isRequired
 */

/**
 * @typedef {Object} Endpoint
 * @readonly
 * @property {string} path
 * @property {RequestMethods} method
 * @property {OptionalBoolean} apiKeyRequired
 * @property {Array.<EndpointBody>} body
 * @property {Array.<string>} pathVars
 */

export * from './customers';
export * from './products';
