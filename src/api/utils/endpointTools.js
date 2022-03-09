import {API_URL} from "../constants";

export const pVarIsNull = '{is_null}';

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
    const conditionRegEx = /\(\?\S*:.*\)/g;
    let path = endpoint.path;

    conditionRegEx.exec(path).forEach((result) => {
        const variableName = result.slice(2, result.length-1).split(':')[0];
        const condVal = result.slice(2,result.length-1).split(':')[1];

        let variableValue = pathValues[variableName];
        if (variableValue === pVarIsNull) variableValue = null;

        let newValue = '';
        if (!(
            typeof variableValue === 'undefined'
            || variableValue === null
            || variableValue === false
        )) {
            // set
            newValue = condVal;
        }
        path = path.replace(result, newValue);
    });

    Object.entries(pathValues).forEach(([key, pathVal]) => {
        let value = pathVal;
        if (pathVal === pVarIsNull) value = '';
        path = path.replace(`{${key}}`, value);
    });
    console.log(pathValues['query']);
    return `${API_URL}/${path || ''}`;
};
