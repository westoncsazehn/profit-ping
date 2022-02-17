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
import { PersistGate } from 'redux-persist/integration/react';
import sessionStorage from 'redux-persist/es/storage/session';
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
import userSagas from './store/user/saga';
import { PERSIST_KEY } from './values';

// keeping this here for any possible future debugging
// const SetTransform = createTransform(
//   (inboundState, key) => {
//     console.log("key", key);
//     console.log("inboundState", inboundState);
//     return inboundState;
//   },
//   (outboundState, key) => {
//     return outboundState;
//   },
// );

const persistConfig = {
  key: PERSIST_KEY,
  storage: sessionStorage
  // ,transforms: [SetTransform]
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
    fork(signOutSagas),
    fork(userSagas)
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
