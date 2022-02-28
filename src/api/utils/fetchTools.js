import {endpointToURL} from "./endpointTools";

/** @type {boolean} isDev */
const isDev = process.env?.NODE_ENV === 'development';

/**
 * @name fetchThis
 * @description Veriyi çekmek için kullanılır.
 * @type function
 * @param {Endpoint} endpoint Talepte bulunulacak endpoint'in object hali
 * @param {Object.<{[key: string]: any}>} endpointBody
 * @param {OptionalString} auth_token Yetkilendirme tokeni
 */

export const fetchThis = async (
    endpoint,
    endpointBody = {},
    auth_token = undefined,
) => {
    const {
        authRequired = false,
        body,
        method,
        path,
    } = endpoint;
    if (
        authRequired
        && !Boolean(auth_token)
    ) {
        if (isDev) {
            const errorMessage = `${path} endpointi için yetkilendirme zorunlu kılınmış ancak auth_token gönderilmemiş!`;
            throw {
                name: 'YetkiGerekliAncakYetkiBelirtilmedi',
                message: errorMessage,
                code: 403,
            };
        }
        return;
    }

    /* Headers */
    const headers = new Headers();
    if (
        authRequired
        && auth_token
    ) headers.append('x-api-key', auth_token);

    const formData = new FormData();

    if (body?.length > 0) {
        let errors = [];

        body.forEach((bodyItem) => {
            const {
                name,
                default: defaultValue = undefined,
                type,
                isRequired = false,
            } = bodyItem;

            let value = (endpointBody || {})[name];
            const defaultValueIsDefined = typeof defaultValue !== 'undefined';

            if (value) {
                const isValid = type(value) === value;
                if (!isValid) {
                    if (isDev) {
                        errors.push(
                            `"${name}" değerinin tipi hatalı. Belirtilen tip "${typeof type()}" iken gönderilen tip "${typeof value}".`
                        );
                    }
                    if (!defaultValueIsDefined) {
                        if (isDev) {
                            errors.push(
                                `"${name}" değerinin tipi hatalı ve default değeri yok. Belirtilen tip "${typeof type()}" iken gönderilen tip "${typeof value}".`
                            );
                        }
                        delete endpointBody[name];
                        return false;
                    }
                    value = defaultValue;
                }
            } else {
                if (isRequired) {
                    console.log(name, 'zorunlu')
                    return false;
                }

                if (defaultValueIsDefined) {
                    value = defaultValue;
                }
            }

            formData.append(name, value)
        });

        if (errors.length) {
            errors.forEach((err) => console.error(err))
        }
    }

    /** @type RequestInit */
    const fetchOptions = {
        method: method,
        headers,
        body: formData,
        redirect: 'follow',
    };

    if (method === 'GET') delete fetchOptions.body;

    return (
        fetch(
            endpointToURL(endpoint),
            fetchOptions
        )
            .then(async (res) => {
                if (res.status === 200) res = await res.json();
                else return res.error()
                return res;
            })
    );
}

export const retry = (failureCount, error) => {
    const noRetryCodes = [
        403,
    ];
    return !noRetryCodes.includes(error?.code);
}