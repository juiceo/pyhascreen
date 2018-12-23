import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, purgeStoredState, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const persistConfig = {
	key: 'pyhascreen_' + process.env.NODE_ENV,
	version: 0,
	storage,
	// migrate: createMigrate(migrations)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	let store = createStore(
		persistedReducer,
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(thunk)
	);
	let persistor = persistStore(store);
	return { store, persistor };
};