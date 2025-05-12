import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tweetSlice from './tweetSlice.js';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ 
    user: userSlice, 
    tweet: tweetSlice 
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export default store;