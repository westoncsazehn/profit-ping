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
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
// local
import { AppPageRx } from './App';
import {
  portfolioReducer,
  userReducer,
  loadingReducer,
  displayAlertReducer,
  cryptoApiReducer,
  addCoinReducer,
  phoneNumberReducer,
  recaptchaReducer,
  navigateReducer
} from './store';
import portfolioSagas from './store/portfolio/saga';
import addCoinSagas from './store/add-coin/saga';
import cryptApiSagas from './store/crypto-api/saga';
import phoneNumberSagas from './store/phone-number/saga';
import deleteUserSagas from './store/delete-user/saga';
import recaptchaSagas from './store/recaptcha/saga';
import signOutSagas from './store/sign-out/saga';

const persistConfig = {
  key: 'root',
  storage
};
// combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  portfolio: portfolioReducer,
  loader: loadingReducer,
  displayAlert: displayAlertReducer,
  cryptoApi: cryptoApiReducer,
  addCoin: addCoinReducer,
  phoneNumber: phoneNumberReducer,
  recaptcha: recaptchaReducer,
  navigate: navigateReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// combine all sagas
function* rootSaga() {
  yield all([
    fork(portfolioSagas),
    fork(addCoinSagas),
    fork(cryptApiSagas),
    fork(phoneNumberSagas),
    fork(deleteUserSagas),
    fork(recaptchaSagas),
    fork(signOutSagas)
  ]);
}
// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// @ts-ignore
const persist = persistStore(store);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <AppPageRx />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
