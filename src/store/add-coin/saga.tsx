// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { format } from 'date-fns';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
// local
import { addCoinActionTypes } from './actions';
import { COIN_DB, db, getCryptoHistory } from '../../api';
import { loadingActionTypes } from '../loading';
import { FirestoreAddCoin } from '../types';
import { displayAlertActionTypes } from '../display-alert';
import { AlertColor } from '@mui/material';

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

function* addCoinSagas() {
  yield all([
    // @ts-ignore
    takeEvery(addCoinActionTypes.ADD_COIN, addCoinSaga)
  ]);
}

export default addCoinSagas;
