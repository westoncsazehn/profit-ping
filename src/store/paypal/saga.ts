// 3rd party
import { OnApproveData } from '@paypal/paypal-js/types/components/buttons';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  limit,
  query,
  Timestamp
} from 'firebase/firestore';
// local
import { paypalActionTypes, setPaypalConfig } from './actions';
import { db, PLANS_DB, SUBSCRIBERS_DB } from '../../api';
import { PORTFOLIO_URL } from '../../pages/common';
import { initAlert } from '../display-alert';
import { setIsLoading } from '../loading';
import { navigateTo } from '../navigate';
import { getUser } from '../user';
import { FBUser } from '../types';

function* getPaypalConfigSaga(): any {
  try {
    const { REACT_APP_PAYPAL_CLIENT_ID: clientID = '' } = process.env;
    const productDBRef = collection(db, PLANS_DB);
    const productQuery = query(productDBRef, limit(1));
    const productSnapshot = yield call(getDocs, productQuery);
    const { id: planID } = productSnapshot?.docs[0]?.data() || { id: 0 };
    if (!planID || !clientID) {
      throw new Error('Unable to access data for product/client ids.');
    }
    yield put(setPaypalConfig({ clientID, planID }));
  } catch (e: any) {
    yield put(
      initAlert({
        open: true,
        message: `${String(e)}`,
        severity: 'error' as AlertColor
      })
    );
  }
}
function* onPaypalApproveSaga({
  payload: { facilitatorAccessToken, orderID, subscriptionID }
}: {
  payload: OnApproveData;
}): any {
  try {
    yield put(setIsLoading(true));
    if (!facilitatorAccessToken || !orderID || !subscriptionID) {
      throw new Error('Subscription activation unsuccessful.');
    }
    const { phoneNumber, uid }: FBUser = yield select(getUser);
    // @ts-ignore
    yield call(setDoc, doc(db, SUBSCRIBERS_DB, uid), {
      facilitatorAccessToken,
      activationDate: Timestamp.fromDate(new Date()),
      orderID,
      subscriptionID,
      phoneNumber
    });
    yield put(navigateTo(PORTFOLIO_URL));
    yield put(setIsLoading(false));
    yield put(
      initAlert({
        open: true,
        message: `Successfully activated Profit Ping Plus subscription.`,
        severity: 'success' as AlertColor
      })
    );
  } catch (e: any) {
    yield put(setIsLoading(true));
    yield put(navigateTo(PORTFOLIO_URL));
    yield put(setIsLoading(false));
    yield put(
      initAlert({
        open: true,
        message: `${e}`,
        severity: 'error' as AlertColor
      })
    );
  }
}
function* onPaypalCancelSaga(): any {
  yield put(setIsLoading(true));
  yield put(navigateTo(PORTFOLIO_URL));
  yield put(setIsLoading(false));
  yield put(
    initAlert({
      open: true,
      message: `Paypal | Profit Ping subscription sign-up cancelled.`,
      severity: 'warning' as AlertColor
    })
  );
}
function* onPaypalErrorSaga(error: Record<string, unknown>): any {
  yield put(setIsLoading(true));
  yield put(navigateTo(PORTFOLIO_URL));
  yield put(setIsLoading(false));
  yield put(
    initAlert({
      open: true,
      message: `${String(error)}`,
      severity: 'error' as AlertColor
    })
  );
}

function* paypalSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      paypalActionTypes.GET_PAYPAL_CONFIG,
      getPaypalConfigSaga
    ),
    takeEvery(
      // @ts-ignore
      paypalActionTypes.ON_PAYPAL_APPROVE,
      onPaypalApproveSaga
    ),
    takeEvery(
      // @ts-ignore
      paypalActionTypes.ON_PAYPAL_CANCEL,
      onPaypalCancelSaga
    ),
    takeEvery(
      // @ts-ignore
      paypalActionTypes.ON_PAYPAL_ERROR,
      onPaypalErrorSaga
    )
  ]);
}
export default paypalSagas;
