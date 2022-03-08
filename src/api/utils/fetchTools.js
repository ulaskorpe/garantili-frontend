import {endpointToURL} from "./endpointTools";

/** @type {boolean} isDev */
const isDev = process.env?.NODE_ENV === 'development';

/**
 * @name fetchThis
 * @description Veriyi çekmek için kullanılır.
 * @type function
 * @param {Endpoint} endpoint Talepte bulunulacak endpoint'in object hali
 * @param {Object.<{[key: string]: any}>} endpointBody
 * @param {OptionalString} apiKey API tokeni
 * @param {Object.<string, any>} endpointPathVars URL'e işlenecek parametreler
 */

export const fetchThis = async (
    endpoint,
    endpointBody = {},
    apiKey = undefined,
    endpointPathVars = {},
) => {
    const {
        path,
        apiKeyRequired = false,
        body,
        method,
        pathVars,
    } = endpoint;
    const pVals = {};

    if (
        apiKeyRequired
        && !Boolean(apiKey)
    ) {
        if (isDev) {
            const errorMessage = `${path} endpointi için yetkilendirme zorunlu kılınmış ancak api_key gönderilmemiş!`;
            throw {
                name: 'YetkiGerekliAncakYetkiBelirtilmedi',
                message: errorMessage,
                code: 403,
            };
        }
        return;
    }

    if (pathVars.length > 0) {
        pathVars.forEach((pathVar) => {
            const val = endpointPathVars && endpointPathVars[pathVar];
            if (typeof val !== 'undefined') {
                pVals[pathVar] = val;
            } else {
                if (isDev) {
                    const errorMessage = `${path} pathvar gönderilmedi`;
                    throw {
                        name: 'PathVarError',
                        message: errorMessage,
                        code: 403,
                    };
                }
            }
        })
    }

    /* Headers */
    const headers = new Headers();
    if (
        apiKeyRequired
        && apiKey
    ) headers.append('x-api-key', apiKey);

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
            endpointToURL(
                endpoint,
                pVals
            ),
            fetchOptions
        )
            .then(async (res) => {
                const successCodes = [
                  200,
                  201,
                ];

                const statusCode = res.status;
                if (res?.json){
                    try {
                        res = await res.json();
                    } catch {
                        throw new Error('Dönen veri hatalı!');
                    }
                }

                if (!res?.status) {
                    throw {
                        message: res?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!',
                        code: res?.errors?.code || undefined,
                    };
                }
                if (!successCodes.includes(statusCode)) {
                    throw new Error(res?.errors?.msg || 'Bilinmeyen bir hata ile karşılaşıldı!');
                }

                return res;
            })
    );
}

export const retry = (failureCount, error) => {
    const noRetryCodes = [
        403,
        404,
    ];
    return !noRetryCodes.includes(error?.code) && failureCount <= 2;
}