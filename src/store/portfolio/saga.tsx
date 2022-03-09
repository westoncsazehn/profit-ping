// 3rd party
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { QueryDocumentSnapshot } from '@firebase/firestore';
import { AlertColor } from '@mui/material';
import { format } from 'date-fns';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  deleteDoc
} from 'firebase/firestore';
// local
import { COIN_DB, db, getCryptoHistory, getCryptoList } from '../../api';
import { CoinAction, FirestoreCoin, PortfolioCoin } from '../types';
import { getFormattedUserCoinsList } from './modifiers';
import { initAlert } from '../display-alert';
import { setIsLoading } from '../loading';
import { getCoins } from './selectors';
import {
  portfolioActionTypes,
  removeCoinSuccess,
  setDefaultPortfolioCoins,
  setPortfolioCoins,
  sortDefaultCryptoList
} from './actions';

export function* getCoinByID(
  id: string,
  uid: string,
  returnRef?: boolean
): any {
  if (!id) return null;
  const coinDbRef = collection(db, COIN_DB);
  const coinsQuery = query(
    coinDbRef,
    where('user', '==', uid),
    where('coin', '==', id),
    limit(1)
  );
  const results = yield call(getDocs, coinsQuery);
  if (!results.docs?.length) return null;
  const coinList: FirestoreCoin[] = [];
  results.forEach((doc: any) => coinList.push(returnRef ? doc : doc?.data()));
  return (coinList && coinList[0]) || null;
}

function* getUsersCryptoListSaga({
  payload: uid
}: {
  type: string;
  payload: string;
}): any {
  yield put(setIsLoading(true));
  try {
    if (!uid) {
      yield put(setDefaultPortfolioCoins());
    }
    const coinDbRef = collection(db, COIN_DB);
    const coinsQuery = query(coinDbRef, where('user', '==', uid));
    // get list from `coin` collection of user's coins from firebase/firestore
    const userCryptoListResults = yield call(getDocs, coinsQuery);
    if (!userCryptoListResults.docs?.length) {
      yield put(setDefaultPortfolioCoins());
    }
    const userCryptoList: FirestoreCoin[] = [];
    // set current crypto data to an array we can actually use
    userCryptoListResults.forEach((doc: any) =>
      userCryptoList.push(doc.data())
    );
    // create list of crypto id's
    const userCryptoIDs: string = userCryptoList
      .slice()
      .map((crypto: FirestoreCoin) => crypto.coin)
      .join(',');
    // get current crypto data from crypto api
    const { data: geckoCoinList } = yield call(getCryptoList, userCryptoIDs);
    // get historic crypto data from crypto api
    const geckoCoinHistoryList = yield all(
      userCryptoList.slice().map(({ coin, initialDate }: FirestoreCoin) =>
        call(
          getCryptoHistory,
          coin,
          // @ts-ignore
          format(initialDate.toDate(), 'dd-MM-yyyy')
        )
      )
    );
    // get PortfolioCoin formatted data from all lists: user, gecko: current & history
    const userCoinPortfolio: PortfolioCoin[] = getFormattedUserCoinsList(
      userCryptoList,
      geckoCoinList,
      geckoCoinHistoryList
    );
    yield put(setPortfolioCoins(userCoinPortfolio));
    yield put(sortDefaultCryptoList());
    yield put(setIsLoading());
    // TODO: add alert for error
    // @ts-ignore
  } catch (_: any) {
    yield put(
      initAlert({
        open: true,
        message: 'Error retrieving portfolio coins. Please try again later.',
        severity: 'error' as AlertColor
      })
    );
    yield put(setIsLoading());
  }
}

function* deleteDocument(id: string, user: string): any {
  const deleteDocRef = collection(db, COIN_DB);
  const deleteDocRefQuery = query(
    deleteDocRef,
    where('user', '==', user),
    where('coin', '==', id),
    limit(1)
  );
  const docs = yield call(getDocs, deleteDocRefQuery);
  let count = 0;
  let docID: string = '';
  docs.forEach((doc: QueryDocumentSnapshot<FirestoreCoin>) => {
    if (count === 0) docID = doc.id;
    count++;
  });
  if (docID) yield deleteDoc(doc(db, `${COIN_DB}/${docID}`));
}

function* removeCoinSaga({ payload: userData }: { payload: CoinAction }): any {
  try {
    yield put(setIsLoading(true));
    const { id, user } = userData;
    yield deleteDocument(id, user);
    const coins: PortfolioCoin[] = yield select(getCoins);
    const filteredCoins = coins.filter((coin) => coin.id !== id);
    yield put(removeCoinSuccess(filteredCoins));
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message: `Successfully removed coin from portfolio.`,
        severity: 'success' as AlertColor
      })
    );
  } catch (_: any) {
    yield put(setIsLoading());
    yield put(
      initAlert({
        open: true,
        message: 'Error removing coin. Please try again later.',
        severity: 'error' as AlertColor
      })
    );
  }
}

function* portfolioSagas() {
  yield all([
    takeEvery(
      // @ts-ignore
      portfolioActionTypes.GET_USERS_CRYPTO_LIST,
      getUsersCryptoListSaga
    ),
    // @ts-ignore
    takeEvery(portfolioActionTypes.REMOVE_COIN, removeCoinSaga)
  ]);
}

export default portfolioSagas;
