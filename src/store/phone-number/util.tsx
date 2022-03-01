// 3rd party
import { call } from 'redux-saga/effects';
import { doc, setDoc } from 'firebase/firestore';
// local
import { db, PHONE_NUMBER_DB } from '../../api';

export function* addPhoneNumberFB(uid: string, phoneNumber: string) {
  // @ts-ignore
  yield call(setDoc, doc(db, PHONE_NUMBER_DB, uid), {
    phoneNumber: phoneNumber
  });
}
