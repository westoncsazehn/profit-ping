// 3rd party
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
// local
import { cryptoAPIActionTypes, setList } from './actions';
import { initAlert } from '../display-alert';
import { BasePortfolioCoin } from '../types';
import { setIsLoading } from '../loading';
import { getCryptoList } from '../../api';
import { isSubscribed } from '../user';

const MAX_CRYPTO_LIST_COUNT: number = 10;

function* getListSaga(): any {
  try {
    yield put(setIsLoading(true));
    const isUserSubscribed = yield select(isSubscribed);
    const { data }: { data: BasePortfolioCoin[] } = yield call(
      getCryptoList,
      '',
      isUserSubscribed ? 0 : MAX_CRYPTO_LIST_COUNT
    );
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
