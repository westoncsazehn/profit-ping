// 3rd party
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// local
import {
  addCoin,
  FBUser,
  getList,
  setIsLoading,
  FirestoreAddCoin,
  AppState,
  BasePortfolioCoin,
  FirestoreCoin,
  getPortfolioCoin,
  updateCoin,
  navigateTo
} from '../../store';
import { AddCoinForm } from './components';
import { PORTFOLIO_URL } from '../common';

const mapDispatchToProps = (dispatch: any) => ({
  setIsLoading: (isLoading?: boolean) => dispatch(setIsLoading(isLoading)),
  addCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(addCoin(coin, uid)),
  updateCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(updateCoin(coin, uid)),
  getList: (uid: string, id: string = '') => dispatch(getList(uid, id)),
  getPortfolioCoin: (id: string, uid: string) =>
    dispatch(getPortfolioCoin(id, uid)),
  navigateTo: (path: string) => dispatch(navigateTo(path))
});
const mapStateToProps = ({ cryptoApi, addCoin, user }: AppState) => ({
  ...cryptoApi,
  ...addCoin,
  user
});
export const AddCoinPage = ({
  cryptoList,
  selectedCoin,
  user: { uid },
  addCoin,
  updateCoin,
  getList,
  getPortfolioCoin,
  navigateTo
}: {
  cryptoList: BasePortfolioCoin[];
  selectedCoin: FirestoreCoin;
  user: FBUser;
  addCoin: any;
  updateCoin: any;
  getList: any;
  getPortfolioCoin: any;
  navigateTo: any;
}) => {
  const { id = '' } = useParams();

  // get list of coins for add coin form
  useEffect(() => getList(uid, id), []);
  // if param id, get user's portfolio coin data
  useEffect(() => {
    if (uid) getPortfolioCoin(id, uid);
  }, []);

  const onAddCoin = (coin: FirestoreAddCoin) => {
    if (uid && coin) {
      id ? updateCoin(coin, uid) : addCoin(coin, uid);
    }
  };
  const onCancel = () => navigateTo(PORTFOLIO_URL);

  return (
    <>
      <AddCoinForm
        coins={cryptoList}
        addCoin={onAddCoin}
        selectedCoin={selectedCoin}
        onCancel={onCancel}
      />
    </>
  );
};

export const AddCoinPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoinPage);
