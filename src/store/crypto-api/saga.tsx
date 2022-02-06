// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { getCryptoList } from '../../api';
import { loadingActionTypes } from '../loading';
import { BasePortfolioCoin } from '../types';
import { cryptoAPIActionTypes } from './actions';
import { displayAlertActionTypes } from '../display-alert';
import { getCoinIDSFromPortfolio } from '../portfolio';

function* getListSaga({
  payload
}: {
  type: typeof cryptoAPIActionTypes.SET_LIST;
  payload: { uid: string; id?: string };
}): any {
  try {
    const { id = '', uid } = payload;
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const coinIDList = yield call(getCoinIDSFromPortfolio, uid) || [];
    const { data }: { data: BasePortfolioCoin[] } = yield call(getCryptoList);
    const filteredCoinData =
      data?.filter((coin: BasePortfolioCoin) =>
        Boolean(id) ? coin.id === id : !coinIDList.includes(coin.id)
      ) || [];
    yield put({
      type: cryptoAPIActionTypes.SET_LIST,
      payload: filteredCoinData
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  } catch (e: any) {
    console.log('e', e);
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Error retrieving coin list from api.`,
        severity: 'error' as AlertColor
      }
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  }
}

function* cryptApiSagas() {
  yield all([
    // @ts-ignore
    takeEvery(cryptoAPIActionTypes.GET_LIST, getListSaga)
  ]);
}

export default cryptApiSagas;
