import {API_URL} from "../constants";

/**
 * @name endpointToURL
 * @description Belirtilen endpoint için tam bir request url'i oluşturur.
 * @type function
 * @param {Endpoint} endpoint Talepte bulunulacak endpoint'in object hali
 * @param {Object.<string, any>} pathValues Talepte bulunulacak endpoint'in object hali
 * @return {string}
 */
export const endpointToURL = (
    endpoint,
    pathValues = {}
) => {
    let path = endpoint.path;
    Object.entries(pathValues).forEach(([key, pathVal]) => {
        path = path.replace(`{${key}}`, pathVal);
    });
    return `${API_URL}/${path || ''}`;
};
