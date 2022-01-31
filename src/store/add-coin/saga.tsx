// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { format } from 'date-fns';
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  getDoc,
  doc,
  where
} from 'firebase/firestore';
// local
import { addCoinActionTypes } from './actions';
import { COIN_DB, db, getCryptoHistory } from '../../api';
import { loadingActionTypes } from '../loading';
import { FirestoreAddCoin, FirestoreCoin } from '../types';
import { displayAlertActionTypes } from '../display-alert';
import { AlertColor } from '@mui/material';
import { getCoinByID } from '../portfolio';

function* addCoinSaga({
  payload: { coin: payloadCoin, email }
}: {
  payload: { coin: FirestoreAddCoin; email: string };
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const { initialDate, coin, initialInvestment, targetMultiplier } =
      payloadCoin;
    const date: Date = new Date(initialDate);
    const stringDate: string = format(date, 'dd-MM-yyyy');
    const historyItem = yield call(getCryptoHistory, coin, stringDate);
    const {
      market_data: {
        current_price: { usd: initialPriceUSD }
      }
    } = historyItem?.data;
    const initialPricePerCoin: number = Number(initialPriceUSD.toFixed(2));
    yield call(addDoc, collection(db, COIN_DB), {
      user: email,
      coin,
      initialDate: Timestamp.fromDate(new Date(initialDate)),
      initialInvestment,
      targetMultiplier,
      initialPricePerCoin
    });
    // yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield window?.history?.back();
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Successfully added coin: ${coin} to portfolio.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (error: any) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Error adding coin to portfolio.`,
        severity: 'error' as AlertColor
      }
    });
  }
}
function* updateCoinSaga({
  payload: { coin: payloadCoin, email }
}: {
  payload: { coin: FirestoreCoin; email: string };
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const {
      initialDate,
      coin,
      initialInvestment,
      targetMultiplier,
      initialPricePerCoin
    } = payloadCoin;
    const { id = '' } = yield getCoinByID(coin, email, true);
    if (!id) throw new Error('no coin id found in portfolio');
    // @ts-ignore
    yield call(updateDoc, doc(db, COIN_DB, id), {
      user: email,
      coin,
      initialDate: Timestamp.fromDate(new Date(initialDate)),
      initialInvestment,
      targetMultiplier,
      initialPricePerCoin
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield window?.history?.back();
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Successfully updated coin: ${coin} in portfolio.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (error: any) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Error updating coin in portfolio.`,
        severity: 'error' as AlertColor
      }
    });
  }
}

function* getPortfolioCoinSaga({
  payload: { id, email }
}: {
  payload: {
    id: string;
    email: string;
  };
}): any {
  try {
    const payload = yield getCoinByID(id, email);
    payload.initialDate = payload.initialDate.toDate();
    yield put({ type: addCoinActionTypes.SET_SELECTED_COIN, payload });
  } catch (e: any) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Error getting coin data from portfolio.`,
        severity: 'error' as AlertColor
      }
    });
  }
}

function* addCoinSagas() {
  yield all([
    // @ts-ignore
    takeEvery(addCoinActionTypes.ADD_COIN, addCoinSaga),
    // @ts-ignore
    takeEvery(addCoinActionTypes.UPDATE_COIN, updateCoinSaga),
    // @ts-ignore
    takeEvery(addCoinActionTypes.GET_PORTFOLIO_COIN, getPortfolioCoinSaga)
  ]);
}

export default addCoinSagas;
