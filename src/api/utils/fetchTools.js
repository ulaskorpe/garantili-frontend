import {endpointToURL} from "./endpointTools";

/**
 * @name fetchThis
 * @description Veriyi çekmek için kullanılır.
 * @type function
 * @param {Endpoint} endpoint Talepte bulunulacak endpoint'in object hali
 * @param {Object.<{[key: string]: any}>} body
 * @param {OptionalString} auth_token Yetkilendirme tokeni
 */
export const fetchThis = async (
    endpoint,
    body = {},
    auth_token = undefined,
) => {
    if (
        endpoint?.authRequired
        && !auth_token
    ) throw new Error(
        `${endpoint?.path} endpointi için yetkilendirme zorunlu kılınmış ancak auth_token gönderilmemiş!`
    );

    /* Headers */
    const headers = new Headers();
    if (
        endpoint?.authRequired
        && auth_token
    ) headers.append('x-api-key', auth_token);


    /** @type RequestInit */
    const fetchOptions = {
        method: endpoint.method,
        body: JSON.stringify(body),
        redirect: 'follow',
    };

    return (
        fetch(
            endpointToURL(endpoint),
            fetchOptions
        )
            .then((res) => {
                if (res.status === 200) return res.json();
            })
    );
}