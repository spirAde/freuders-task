import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const isDevelopment = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
  middleware,
});

sagaMiddleware.run(rootSaga);

if (isDevelopment && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./rootReducer');
    store.replaceReducer(newRootReducer);
  });
}

export default store;
