import React from 'react';
import ReactDOM from 'react-dom';
import { AppPageRx } from './App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { portfolioReducer, userReducer } from './store';
import { all, fork } from 'redux-saga/effects';
import portfolioSagas from './store/portfolio/saga';
import userSagas from './store/user/saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage
};
// combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// combine all sagas
function* rootSaga() {
  yield all([fork(userSagas), fork(portfolioSagas)]);
}

// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// @ts-ignore
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppPageRx />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
