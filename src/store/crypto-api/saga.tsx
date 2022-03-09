// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { cryptoAPIActionTypes, setList } from './actions';
import { initAlert } from '../display-alert';
import { BasePortfolioCoin } from '../types';
import { setIsLoading } from '../loading';
import { getCryptoList } from '../../api';

function* getListSaga(): any {
  try {
    yield put(setIsLoading(true));
    const { data }: { data: BasePortfolioCoin[] } = yield call(getCryptoList);
    yield put(setList(data || []));
    yield put(setIsLoading());
  } catch (_: any) {
    yield put(
      initAlert({
        open: true,
        message: `Error retrieving coin list data from api.`,
        severity: 'error' as AlertColor
      })
    );
    yield put(setIsLoading());
  }
}

function* cryptApiSagas() {
  yield all([
    // @ts-ignore
    takeEvery(cryptoAPIActionTypes.GET_LIST, getListSaga)
  ]);
}

export default cryptApiSagas;
