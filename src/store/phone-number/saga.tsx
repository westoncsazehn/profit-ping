// 3rd party
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AlertColor } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
// local
import { loadingActionTypes } from '../loading';
import { phoneNumberActionTypes } from './actions';
import { displayAlertActionTypes } from '../display-alert';
import { db, PHONE_NUMBER_DB } from '../../api';
import { addPhoneNumberFB } from './util';

function* addPhoneNumberSaga({
  payload: { uid, phoneNumber }
}: {
  payload: { uid: string; phoneNumber: number };
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    // @ts-ignore
    yield addPhoneNumberFB(uid, phoneNumber);
    yield put({
      type: phoneNumberActionTypes.GET_PHONE_NUMBER_SUCCESS,
      payload: phoneNumber
    });
    yield window?.history?.back();
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Successfully added phone number.`,
        severity: 'success' as AlertColor
      }
    });
  } catch (e: any) {
    yield put({
      type: displayAlertActionTypes.INIT_ALERT,
      payload: {
        open: true,
        message: `Error adding phone number.`,
        severity: 'error' as AlertColor
      }
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  }
}

function* getPhoneNumberSaga({
  payload: uid
}: {
  type: typeof phoneNumberActionTypes.GET_PHONE_NUMBER;
  payload: string;
}): any {
  try {
    yield put({ type: loadingActionTypes.SET_IS_LOADING, payload: true });
    const docRef = doc(db, `${PHONE_NUMBER_DB}/${uid}`);
    const docSnapshot = yield call(getDoc, docRef);
    let phone = 0;
    if (docSnapshot.exists()) phone = docSnapshot.data()?.phoneNumber;
    yield put({
      type: phoneNumberActionTypes.GET_PHONE_NUMBER_SUCCESS,
      payload: phone
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  } catch (e: any) {
    yield put({
      type: phoneNumberActionTypes.ADD_PHONE_NUMBER_FAILED,
      payload: {
        open: true,
        message: `Error retrieving phone number from api.`,
        severity: 'error' as AlertColor
      }
    });
    yield put({ type: loadingActionTypes.SET_IS_LOADING });
  }
}

function* phoneNumberSagas() {
  yield all([
    // @ts-ignore
    takeEvery(phoneNumberActionTypes.GET_PHONE_NUMBER, getPhoneNumberSaga),
    // @ts-ignore
    takeEvery(phoneNumberActionTypes.ADD_PHONE_NUMBER, addPhoneNumberSaga)
  ]);
}

export default phoneNumberSagas;
