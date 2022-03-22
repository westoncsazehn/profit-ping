// 3rd party
import { applyMiddleware, combineReducers, createStore } from 'redux';
import sessionStorage from 'redux-persist/es/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import { PERSIST_KEY } from './values';
// for debugging redux > state/store
// import logger from 'redux-logger';
import {
  addCoinReducer,
  cryptoApiReducer,
  displayAlertReducer,
  loadingReducer,
  navigateReducer,
  paypalReducer,
  portfolioReducer,
  recaptchaReducer,
  userReducer
} from './store';
// local
import displayAlertSagas from './store/display-alert/saga';
import deleteUserSagas from './store/delete-user/saga';
import portfolioSagas from './store/portfolio/saga';
import cryptApiSagas from './store/crypto-api/saga';
import recaptchaSagas from './store/recaptcha/saga';
import addCoinSagas from './store/add-coin/saga';
import signOutSagas from './store/sign-out/saga';
import createSagaMiddleware from 'redux-saga';
import userSagas from './store/user/saga';
import paypalSagas from './store/paypal/saga';

// keeping this here for any possible future debugging
// const SetTransform = createTransform(
//   (inboundState, key) => {
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
  recaptcha: recaptchaReducer,
  navigate: navigateReducer,
  paypal: paypalReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// combine all sagas
function* rootSaga() {
  yield all([
    fork(portfolioSagas),
    fork(addCoinSagas),
    fork(cryptApiSagas),
    fork(deleteUserSagas),
    fork(recaptchaSagas),
    fork(signOutSagas),
    fork(userSagas),
    fork(displayAlertSagas),
    fork(paypalSagas)
  ]);
}
// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  // for debugging redux > state/store
  // applyMiddleware(sagaMiddleware, logger)
  applyMiddleware(sagaMiddleware)
);
// @ts-ignore
export const persist = persistStore(store);
sagaMiddleware.run(rootSaga);
