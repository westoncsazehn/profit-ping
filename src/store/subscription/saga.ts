// 3rd party
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { doc, getDoc } from 'firebase/firestore';
import { AlertColor } from '@mui/material';
// local
import { db, SUBSCRIBERS_DB } from '../../api';
import { initAlert } from '../display-alert';
import { setIsLoading } from '../loading';
import { getUser } from '../user';
import {
  getSubscriptionDetailsSuccess,
  subscriptionActionTypes
} from './actions';

const subscriptionError: string = `Unable to retrieve subscription details.
 Please try again later.`;

function* getSubscriptionDetailsSaga(): any {
  try {
    yield put(setIsLoading(true));
    const { uid, isSubscribed } = yield select(getUser);
    if (uid && isSubscribed) {
      const subscriptionSnapshot = yield call(
        getDoc,
        doc(db, SUBSCRIBERS_DB, uid)
      );
      if (!subscriptionSnapshot.exists()) {
        throw new Error(subscriptionError);
      }
      yield put(getSubscriptionDetailsSuccess(subscriptionSnapshot?.data()));
    }
    yield put(setIsLoading());
  } catch (_: any) {
    yield put(
      initAlert({
        open: true,
        message: subscriptionError,
        severity: 'error' as AlertColor
      })
    );
    yield put(setIsLoading());
  }
}

function* subscriptionDetailsSagas() {
  yield all([
    // @ts-ignore
    takeEvery(
      subscriptionActionTypes.GET_SUBSCRIPTION_DETAILS,
      getSubscriptionDetailsSaga
    )
  ]);
}
export default subscriptionDetailsSagas;
