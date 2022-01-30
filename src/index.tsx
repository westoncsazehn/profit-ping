// 3rd party
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// local
import { AppPageRx } from './App';
import {
  portfolioReducer,
  userReducer,
  loadingReducer,
  displayAlertReducer,
  cryptoApiReducer
} from './store';
import portfolioSagas from './store/portfolio/saga';
import userSagas from './store/user/saga';
import addCoinSagas from './store/add-coin/saga';
import cryptApiSagas from './store/crypto-api/saga';

// combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  loader: loadingReducer,
  displayAlert: displayAlertReducer,
  cryptoApi: cryptoApiReducer
});

// combine all sagas
function* rootSaga() {
  yield all([
    fork(userSagas),
    fork(portfolioSagas),
    fork(addCoinSagas),
    fork(cryptApiSagas)
  ]);
}

// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppPageRx />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
