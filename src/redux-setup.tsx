import { PERSIST_KEY } from './values';
import sessionStorage from 'redux-persist/es/storage/session';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {
  addCoinReducer,
  cryptoApiReducer,
  displayAlertReducer,
  loadingReducer,
  navigateReducer,
  phoneNumberReducer,
  portfolioReducer,
  recaptchaReducer,
  userReducer
} from './store';
import { persistReducer, persistStore } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import portfolioSagas from './store/portfolio/saga';
import addCoinSagas from './store/add-coin/saga';
import cryptApiSagas from './store/crypto-api/saga';
import phoneNumberSagas from './store/phone-number/saga';
import deleteUserSagas from './store/delete-user/saga';
import recaptchaSagas from './store/recaptcha/saga';
import signOutSagas from './store/sign-out/saga';
import userSagas from './store/user/saga';
import displayAlertSagas from './store/display-alert/saga';
import createSagaMiddleware from 'redux-saga';

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
    fork(userSagas),
    fork(displayAlertSagas)
  ]);
}
// init store with saga/reducers
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
// @ts-ignore
export const persist = persistStore(store);
sagaMiddleware.run(rootSaga);
