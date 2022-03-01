// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { getCryptoList } from '../../api';
import { loadingActionTypes } from '../loading';
import { BasePortfolioCoin } from '../types';
import { cryptoAPIActionTypes } from './actions';
import { displayAlertActionTypes } from '../display-alert';

function* getListSaga(): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const { data }: { data: BasePortfolioCoin[] } = yield call(getCryptoList);
    yield put({
      type: cryptoAPIActionTypes.SET_LIST,
      payload: data || []
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  } catch (e: any) {
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
