import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import rootReducer from '../component/Reducer/index'; // Import your combined reducers
import {thunk} from 'redux-thunk'; // Middleware for asynchronous actions
import { saveCartToSessionStorage } from './middleware'; // Import middleware

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['cart'], // Persist only the cart slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, saveCartToSessionStorage));

const persistor = persistStore(store);

export default { store, persistor };