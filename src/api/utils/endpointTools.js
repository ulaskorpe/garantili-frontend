import {API_URL} from "../constants";

/**
 * @name endpointToURL
 * @description Belirtilen endpoint için tam bir request url'i oluşturur.
 * @type function
 * @param {Endpoint} endpoint Talepte bulunulacak endpoint'in object hali
 * @return {string}
 */
export const endpointToURL = (endpoint) => `${API_URL}/${endpoint?.path || ''}`;
