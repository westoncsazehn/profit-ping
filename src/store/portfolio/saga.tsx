// 3rd party
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getToken } from 'firebase/messaging';
import { format } from 'date-fns';
// local
import { portfolioActionTypes } from './actions';
import {
  COIN_DB,
  FirestoreCoin,
  db,
  DEVICE_TOKEN_DB,
  getCryptoHistory,
  getCryptoList,
  messaging,
  PortfolioTableCoins
} from '../../api';
import { getUserEmail } from '../user';
import { getFormattedUserCoinsList } from './modifiers';
import { FBUser } from '../types';

const deviceTokenCollection = collection(db, DEVICE_TOKEN_DB);

function* getDeviceTokenSaga({ payload: email }: { payload: string }): any {
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
    // TODO: add alert for error
    // @ts-ignore
  } catch (e: any) {
    yield put({ type: 'GET_DEVICE_TOKEN_FAILED', message: e.message });
  }
}

function* addDeviceTokenSaga(): any {
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
    // get PortfolioTableCoins formatted data from all lists: user, gecko: current & history
    const userCoinPortfolio: PortfolioTableCoins[] = getFormattedUserCoinsList(
      userCryptoList,
      geckoCoinList,
      geckoCoinHistoryList
    );
    yield put({
      type: portfolioActionTypes.GET_USERS_CRYPTO_SUCCESS,
      payload: userCoinPortfolio
    });
    // TODO: add alert for error
    // @ts-ignore
  } catch (e: any) {
    yield put({
      type: portfolioActionTypes.GET_USERS_CRYPTO_FAILED,
      payload: e.toString()
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
    )
  ]);
}

export default portfolioSagas;
