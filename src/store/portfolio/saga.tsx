import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { portfolioActionTypes } from './actions';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, DEVICE_TOKEN_DB, messaging } from '../../api';
import { getToken } from 'firebase/messaging';
import { getUserEmail } from '../user';

const deviceTokenCollection = collection(db, DEVICE_TOKEN_DB);

function* getDeviceTokenSaga({ payload: email }: { payload: string }): any {
  try {
    let userDeviceToken: string = '';
    const userDeviceTokenQuery = query(
      deviceTokenCollection,
      where('user', '==', email)
    );
    const deviceTokenDocRef = yield call(getDocs, userDeviceTokenQuery);
    deviceTokenDocRef.forEach((doc: any) => {
      const { deviceToken } = doc.data();
      userDeviceToken = deviceToken;
    });
    yield put({ type: 'GET_DEVICE_TOKEN_SUCCESS', payload: userDeviceToken });
  } catch (e: any) {
    yield put({ type: 'GET_DEVICE_TOKEN_FAILED', message: e.message });
  }
}
function* addDeviceToken(): any {
  try {
    const email: string = yield select(getUserEmail);
    const deviceToken: string = yield call(getToken, messaging, {
      vapidKey:
        'BJ3e6D7j6AJtJ8D0SyREVCz7r-LcfoTod7U5jpHHzkZazg1S78lmpoxuQjrPduB9BDcoEYEXlgObcc786u4U_fs'
    });
    const addDeviceTokenResult = yield call(
      addDoc,
      collection(db, DEVICE_TOKEN_DB),
      {
        deviceToken,
        user: email
      }
    );
  } catch (e: any) {}
  // getToken(messaging, {
  //   vapidKey:
  //     'BJ3e6D7j6AJtJ8D0SyREVCz7r-LcfoTod7U5jpHHzkZazg1S78lmpoxuQjrPduB9BDcoEYEXlgObcc786u4U_fs'
  // })
  //   .then((deviceToken) => {
  //     if (!userDeviceToken && deviceToken && email) {
  //       addDeviceToken({ deviceToken, user: email })
  //         .then((res: any) => console.log)
  //         .catch((e: any) => console.log);
  //     } else {
  //       console.log(
  //         'No registration token available. Request permission to generate one.'
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while retrieving the device token:', err);
  //   });
}

function* portfolioSagas() {
  yield all([
    // @ts-ignore
    takeEvery(portfolioActionTypes.GET_DEVICE_TOKEN, getDeviceTokenSaga),
    // @ts-ignore
    takeEvery(portfolioActionTypes.ADD_GET_DEVICE_TOKEN, addDeviceToken)
  ]);
}

export default portfolioSagas;
