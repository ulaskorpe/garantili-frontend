import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from './reducers'

const persistConfig = {
    key: 'e',
    version: 1,
    storage,
    whitelist: [
        'auth',
        'basket',
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(logger)
    ),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store