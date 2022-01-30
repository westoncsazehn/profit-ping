// 3rd party
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { getToken } from 'firebase/messaging';
import { QueryDocumentSnapshot } from '@firebase/firestore';
import { format } from 'date-fns';
// local
import { portfolioActionTypes } from './actions';
import {
  COIN_DB,
  db,
  DEVICE_TOKEN_DB,
  getCryptoHistory,
  getCryptoList,
  messaging
} from '../../api';
import { getUserEmail } from '../user';
import { getFormattedUserCoinsList } from './modifiers';
import { loadingActionTypes } from '../loading';
import { CoinAction, FirestoreCoin, PortfolioCoinsResponse } from '../types';
import { getCoins } from './selectors';
import { displayAlertActionTypes } from '../display-alert';
import { AlertColor } from '@mui/material';

const deviceTokenCollection = collection(db, DEVICE_TOKEN_DB);

// get user's coin portfolio, then grab coin unique identifiers > 'coin' prop
export function* getCoinIDSFromPortfolio(email: string): any {
  if (!email) return [];
  const coinDbRef = collection(db, COIN_DB);
  const coinsQuery = query(coinDbRef, where('user', '==', email));
  // get list from `coin` collection of user's coins from firebase/firestore
  const userCryptoListResults = yield call(getDocs, coinsQuery);
  if (!userCryptoListResults.docs?.length) return [];
  const coinIDList: FirestoreCoin[] = [];
  userCryptoListResults.forEach((doc: any) =>
    coinIDList.push(doc?.data()?.coin)
  );
  return coinIDList;
}

function* getDeviceTokenSaga({ payload: email }: { payload: string }): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    let userDeviceToken: string = '';
    const userDeviceTokenQuery = query(
      deviceTokenCollection,
      where('user', '==', email)
    );
    const deviceTokenDocRef = yield call(getDocs, userDeviceTokenQuery);
    deviceTokenDocRef.forEach((doc: any) => {
      const { deviceToken } = doc.data();
      userDeviceToken = deviceToken;
    });
    yield put({ type: 'GET_DEVICE_TOKEN_SUCCESS', payload: userDeviceToken });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    // TODO: add alert for error
    // @ts-ignore
  } catch (e: any) {
    yield put({ type: 'GET_DEVICE_TOKEN_FAILED', message: e.message });
  }
}

function* addDeviceTokenSaga(): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    const email: string = yield select(getUserEmail);
    // TODO: set vapidKey to env config
    const deviceToken: string = yield call(getToken, messaging, {
      vapidKey:
        'BJ3e6D7j6AJtJ8D0SyREVCz7r-LcfoTod7U5jpHHzkZazg1S78lmpoxuQjrPduB9BDcoEYEXlgObcc786u4U_fs'
    });
    const newDeviceToken = yield call(addDoc, collection(db, DEVICE_TOKEN_DB), {
      deviceToken,
      user: email
    });
    yield put({
      type: portfolioActionTypes.ADD_GET_DEVICE_TOKEN_SUCCESS,
      payload: newDeviceToken
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    // TODO: add alert for error
    // @ts-ignore
  } catch (e: any) {
    yield put({
      type: portfolioActionTypes.ADD_GET_DEVICE_TOKEN_FAILED,
      payload: e.toString()
    });
  }
}

const defaultResponse = {
  type: portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS,
  payload: []
};

function* getUsersCryptoListSaga({
  payload: email
}: {
  type: string;
  payload: string;
}): any {
  yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
  try {
    if (!email) yield put(defaultResponse);
    const coinDbRef = collection(db, COIN_DB);
    const coinsQuery = query(coinDbRef, where('user', '==', email));
    // get list from `coin` collection of user's coins from firebase/firestore
    const userCryptoListResults = yield call(getDocs, coinsQuery);
    if (!userCryptoListResults.docs?.length) {
      yield put(defaultResponse);
    }
    const userCryptoList: FirestoreCoin[] = [];
    // set current crypto data to an array we can actually use
    userCryptoListResults.forEach((doc: any) => {
      return userCryptoList.push(doc.data());
    });
    // create list of crypto id's
    const userCryptoIDs: string = userCryptoList
      .slice()
      .map((crypto: FirestoreCoin) => crypto.coin)
      .join(',');
    // get current crypto data from crypto api
    const { data: geckoCoinList } = yield call(getCryptoList, userCryptoIDs);
    // get historic crypto data from crypto api
    const geckoCoinHistoryList = yield all(
      userCryptoList.slice().map(({ coin, initialDate }: FirestoreCoin) =>
        call(
          getCryptoHistory,
          coin,
          // @ts-ignore
          format(initialDate.toDate(), 'dd-MM-yyyy')
        )
      )
    );
    // get PortfolioTableCoin formatted data from all lists: user, gecko: current & history
    const userCoinPortfolio: PortfolioCoinsResponse[] =
      getFormattedUserCoinsList(
        userCryptoList,
        geckoCoinList,
        geckoCoinHistoryList
      );
    yield put({
      type: portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS,
      payload: userCoinPortfolio
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    // TODO: add alert for error
    // @ts-ignore
  } catch (e: any) {
    yield put({
      type: portfolioActionTypes.GET_USERS_CRYPTO_FAILED,
      payload: e.toString()
    });
  }
}

function* deleteDocument(id: string, user: string): any {
  const deleteDocRef = collection(db, COIN_DB);
  const deleteDocRefQuery = query(
    deleteDocRef,
    where('user', '==', user),
    where('coin', '==', id),
    limit(1)
  );
  const docs = yield call(getDocs, deleteDocRefQuery);
  let count = 0;
  let docID: string = '';
  docs.forEach((doc: QueryDocumentSnapshot<FirestoreCoin>) => {
    if (count === 0) docID = doc.id;
    count++;
  });
  if (docID) yield deleteDoc(doc(db, `${COIN_DB}/${docID}`));
}

function* removeCoinSaga({ payload }: { payload: CoinAction }): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const { id, user } = payload;
    yield deleteDocument(id, user);
    const coins: PortfolioCoinsResponse[] = yield select(getCoins);
    const filteredCoins = coins.filter((coin) => coin.id !== id);
    yield put({
      type: portfolioActionTypes.REMOVE_COIN_SUCCESS,
      payload: filteredCoins
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Successfully removed coin from portfolio.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (e: any) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: e.toString(),
        severity: 'error' as AlertColor
      }
    });
  }
}
function* takeProfitSaga({ payload }: { payload: CoinAction }): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const { id, user } = payload;
    yield deleteDocument(id, user);
    const coins: PortfolioCoinsResponse[] = yield select(getCoins);
    const filteredCoins = coins.filter((coin) => coin.id !== id);
    yield put({
      type: portfolioActionTypes.TAKE_PROFIT_SUCCESS,
      payload: filteredCoins
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Successfully took coin profits.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (e: any) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: e.toString(),
        severity: 'error' as AlertColor
      }
    });
  }
}

function* portfolioSagas() {
  yield all([
    // @ts-ignore
    takeEvery(portfolioActionTypes.GET_DEVICE_TOKEN, getDeviceTokenSaga),
    // @ts-ignore
    takeEvery(portfolioActionTypes.ADD_GET_DEVICE_TOKEN, addDeviceTokenSaga),
    takeEvery(
      // @ts-ignore
      portfolioActionTypes.GET_USERS_CRYPTO_LIST,
      getUsersCryptoListSaga
    ),
    // @ts-ignore
    takeEvery(portfolioActionTypes.REMOVE_COIN, removeCoinSaga),
    // @ts-ignore
    takeEvery(portfolioActionTypes.TAKE_PROFIT, takeProfitSaga)
  ]);
}

export default portfolioSagas;
