// 3rd party
import { applyMiddleware, combineReducers, createStore } from 'redux';
import sessionStorage from 'redux-persist/es/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// for debugging redux > state/store
// import logger from 'redux-logger';
// local
import subscriptionDetailsSagas from './store/subscription/saga';
import displayAlertSagas from './store/display-alert/saga';
import deleteUserSagas from './store/delete-user/saga';
import portfolioSagas from './store/portfolio/saga';
import cryptApiSagas from './store/crypto-api/saga';
import recaptchaSagas from './store/recaptcha/saga';
import addCoinSagas from './store/add-coin/saga';
import signOutSagas from './store/sign-out/saga';
import paypalSagas from './store/paypal/saga';
import userSagas from './store/user/saga';
import { PERSIST_KEY } from './values';
import {
  displayAlertReducer,
  subscriptionReducer,
  cryptoApiReducer,
  portfolioReducer,
  recaptchaReducer,
  navigateReducer,
  addCoinReducer,
  loadingReducer,
  paypalReducer,
  userReducer
} from './store';

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
  subscription: subscriptionReducer,
  displayAlert: displayAlertReducer,
  cryptoApi: cryptoApiReducer,
  portfolio: portfolioReducer,
  recaptcha: recaptchaReducer,
  navigate: navigateReducer,
  addCoin: addCoinReducer,
  loader: loadingReducer,
  paypal: paypalReducer,
  user: userReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// combine all sagas
function* rootSaga() {
  yield all([
    fork(subscriptionDetailsSagas),
    fork(displayAlertSagas),
    fork(deleteUserSagas),
    fork(recaptchaSagas),
    fork(portfolioSagas),
    fork(cryptApiSagas),
    fork(addCoinSagas),
    fork(signOutSagas),
    fork(paypalSagas),
    fork(userSagas)
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
