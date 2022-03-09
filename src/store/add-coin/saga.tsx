// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { format } from 'date-fns';
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { AlertColor } from '@mui/material';
// local
import { addCoinActionTypes, resetSelectedCoin } from "./actions";
import { COIN_DB, db, getCryptoHistory, getCryptoList } from '../../api';
import { loadingActionTypes } from '../loading';
import { BasePortfolioCoin, FirestoreAddCoin, FirestoreCoin } from '../types';
import { displayAlertActionTypes } from '../display-alert';
import { getCoinByID } from '../portfolio';
import { navigateTo } from '../navigate';
import { PORTFOLIO_URL } from '../../pages/common';

function* getCurrentPriceByCoinID(coin: string): any {
  const { data } = yield call(getCryptoList, coin);
  const coinData: BasePortfolioCoin = data.find(
    (item: BasePortfolioCoin) => item.id === coin
  );
  return coinData?.current_price || 0;
}

function* checkIfInProfit(
  coin: string,
  historyPrice: number,
  quantity: number,
  multiplier: number,
  name?: string
): Generator<boolean> {
  // @ts-ignore
  const currentPrice: number = yield getCurrentPriceByCoinID(coin);
  if (0 === currentPrice) {
    return false;
  }
  const qm: number = quantity * multiplier;
  const currentMultiplier: number = (currentPrice * qm) / (historyPrice * qm);
  if (currentMultiplier >= multiplier) {
    return `${name || coin} is already ${currentMultiplier.toFixed(
      2
    )}x in profit.`;
  }
  return false;
}

function* addCoinSaga({
  payload: { coin: payloadCoin, uid }
}: {
  payload: { coin: FirestoreAddCoin; uid: string };
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
      },
      name
    } = historyItem?.data;
    const initialPricePerCoin: number = Number(initialPriceUSD.toFixed(2));
    const inProfitMessage: boolean = yield checkIfInProfit(
      coin,
      initialPriceUSD,
      initialInvestment,
      targetMultiplier,
      name
    );
    if (inProfitMessage) {
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
      yield put({
        type: addCoinActionTypes.SET_SELECTED_COIN,
        payload: {
          error: inProfitMessage
        }
      });
    } else {
      yield call(addDoc, collection(db, COIN_DB), {
        user: uid,
        coin,
        initialDate: Timestamp.fromDate(new Date(initialDate)),
        initialInvestment,
        targetMultiplier,
        initialPricePerCoin,
        isMessageEnabled: true
      });
      yield put(resetSelectedCoin());
      yield put(navigateTo(PORTFOLIO_URL));
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
      yield put({
        type: displayAlertActionTypes.INIT_ALERT,
        payload: {
          open: true,
          message: `Successfully added ${name || coin} to portfolio.`,
          severity: 'success' as AlertColor
        }
      });
    }
  } catch (error: any) {
    yield put(navigateTo(PORTFOLIO_URL));
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: String(error),
        severity: 'error' as AlertColor
      }
    });
  }
}
function* updateCoinSaga({
  payload: { coin: payloadCoin, uid }
}: {
  payload: { coin: FirestoreCoin; uid: string };
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
    const { id = '' } = yield getCoinByID(coin, uid, true);
    if (!id) throw new Error('Cannot find coin in portfolio.');
    const date: Date = new Date(initialDate);
    const stringDate: string = format(date, 'dd-MM-yyyy');
    const historyItem = yield call(getCryptoHistory, coin, stringDate);
    const {
      market_data: {
        current_price: { usd: initialPriceUSD }
      },
      name
    } = historyItem?.data;
    const inProfitMessage: boolean = yield checkIfInProfit(
      coin,
      initialPriceUSD,
      initialInvestment,
      targetMultiplier,
      name
    );
    if (inProfitMessage) {
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
      yield put({
        type: addCoinActionTypes.SET_SELECTED_COIN,
        payload: {
          error: inProfitMessage
        }
      });
    } else {
      // @ts-ignore
      yield call(updateDoc, doc(db, COIN_DB, id), {
        user: uid,
        coin,
        initialDate: Timestamp.fromDate(new Date(initialDate)),
        initialInvestment,
        targetMultiplier,
        initialPricePerCoin,
        isMessageEnabled: true
      });
      yield put(resetSelectedCoin());
      yield put(navigateTo(PORTFOLIO_URL));
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
      yield put({
        type: displayAlertActionTypes.INIT_ALERT,
        payload: {
          open: true,
          message: `Successfully updated ${name || coin} in portfolio.`,
          severity: 'success' as AlertColor
        }
      });
    }
  } catch (error: any) {
    yield put(navigateTo(PORTFOLIO_URL));
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: String(error),
        severity: 'error' as AlertColor
      }
    });
  }
}

function* getPortfolioCoinSaga({
  payload: { id, uid }
}: {
  payload: {
    id: string;
    uid: string;
  };
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    if (!id) {
      yield put({
        type: addCoinActionTypes.RESET_SELECTED_COIN
      });
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
    } else {
      const payload = yield getCoinByID(id, uid);
      payload.initialDate = payload.initialDate.toDate();
      yield put({ type: addCoinActionTypes.SET_SELECTED_COIN, payload });
      yield put({ type: loadingActionTypes.SET_IS_LOADING });
    }
  } catch (e: any) {
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
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
