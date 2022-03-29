import {useCallback, useMemo} from "react";
import {
    v4 as generateUUID,
    validate as validateUUID,
    version as getUUIDVersion,
} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../selectors/auth";
import {authLogin, authLogOut} from "../actions/auth";

/**
 * @typedef {Object} GuestAuthState
 * @property {('guest' | 'user')} type
 * @property {string} customer_id
 */

const MODE_IS_DEV = process.env.NODE_ENV === 'development';
const authError = (message) => {
    if (MODE_IS_DEV) {
        throw new Error(message);
    }

    return false;
}

const useAuth = () => {
    const dispatch = useDispatch();
    const account = useSelector(selectUser);

    /** @return {boolean} */
    const idIsValid = useMemo(() => {
        return Boolean(
            account?.customer_id
            && account?.customer_id.length > 0
        );
    }, [account])
    /** @return {boolean} */
    const isGuest = useMemo(() => {
        if (!(
            account?.type
            && account.type.length
            && account?.customer_id
            && account.customer_id.length > 2
            && (account.type || '') === 'guest'
            && ((account.customer_id || '')[0] || '').toLowerCase() === 'g'
        )) return false;

        const slicedGuestID = account.customer_id.slice(2);
        try {
            return (
                getUUIDVersion(slicedGuestID) === 4
                && validateUUID(slicedGuestID)
            )
        } catch {
            return false;
        }
    }, [account]);
    /** @return {boolean} */
    const isUser = useMemo(() => {
        if (isGuest) return false;
        if (!idIsValid) return false;

        return (
            account.customer_id[0] !== 'g'
        );
    }, [account, isGuest, idIsValid]);
    /** @returns {('not_logged' | 'guest' | 'user')} */
    const loginType = useMemo(() => {
        let type = 'not_logged';

        if (isGuest) type = 'guest';
        if (isUser) type = 'user';

        return type;
    }, [isGuest, isUser]);

    /**
     * @param {GuestAuthState} userData
     * @return {boolean}
     * */
    const login = useCallback((userData) => {
        if (loginType === 'user') {
            return authError(
                'Kullanıcı zaten giriş yapmış! Eğer bilgileri güncellemek istiyorsan "login" yerine "update" fonksiyonunu kullan.'
            );
        }

        if (!userData) {
            return authError(
                '"userData" parametresi "login" fonksiyonuna gönderilmemiş veya boş gelmiş lütfen bunu kontrol et.'
            );
        }
        if (!userData.type) {
            return authError(
                '"userData" parametresi içindeki "type" değeri "login" fonksiyonuna gönderilmemiş veya boş gelmiş lütfen bunu kontrol et.'
            );
        }
        if (!userData.customer_id) {
            return authError(
                '"userData" parametresi içindeki "customer_id" değeri "login" fonksiyonuna gönderilmemiş veya boş gelmiş lütfen bunu kontrol et.'
            );
        }

        dispatch(authLogin(userData));
        return true;
    }, [loginType, dispatch]);
    const createGuest = useCallback(() => {
        if (isUser) return authError(
            'Kullanıcı zaten kendi hesabını kullanarak giriş yapmış. Misafir olarak kayıt edebilmemiz için önce çıkış yapması gerekiyor.'
        )
        if (isGuest) return false;

        const generatedID = generateUUID();
        if (
            generatedID
            && typeof generatedID === 'string'
            && generatedID.length
        ) {
            const guestID = `g-${generatedID}`;
            const guestData = {
                id: guestID,
                customer_id: guestID,
                type: 'guest',
            };

            login(guestData);
            return true;
        }

        return false;
    }, [isGuest, isUser, login])

    const logOut = useCallback(() => {
        if (loginType !== 'user') {
            return authError(
                'Çıkış işlemini yapabilmemiz için kullanıcının giriş yapmış olması gerekiyor.'
            );
        }

        dispatch(authLogOut());
    }, [loginType, dispatch]);

    return {
        account,

        /* Memos */
        isGuest,
        isUser,
        isLogged: isUser,
        loginType,

        /* Callbacks */
        login,
        logOut,
        createGuest,
    };
};

export default useAuth;
