// 3rd party
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// local
import { UserContext } from '../../api';
import {
  addCoin,
  FBUser,
  setIsLoading,
  FirestoreAddCoin,
  AppState,
  BasePortfolioCoin,
  FirestoreCoin,
  getPortfolioCoin,
  updateCoin
} from '../../store';
import { AddCoinForm } from './components';
import { getList } from '../../store';

const mapDispatchToProps = (dispatch: any) => ({
  setIsLoading: (isLoading?: boolean) => dispatch(setIsLoading(isLoading)),
  addCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(addCoin(coin, uid)),
  updateCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(updateCoin(coin, uid)),
  getList: (uid: string, id: string = '') => dispatch(getList(uid, id)),
  getPortfolioCoin: (id: string, uid: string) =>
    dispatch(getPortfolioCoin(id, uid))
});
const mapStateToProps = ({ cryptoApi, addCoin }: AppState) => ({
  ...cryptoApi,
  ...addCoin
});
export const AddCoinPage = ({
  cryptoList,
  addCoin,
  updateCoin,
  getList,
  getPortfolioCoin,
  selectedCoin
}: {
  cryptoList: BasePortfolioCoin[];
  addCoin: any;
  updateCoin: any;
  getList: any;
  getPortfolioCoin: any;
  selectedCoin: FirestoreCoin;
}) => {
  const { uid } = useContext<FBUser>(UserContext);
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

  return (
    <>
      <AddCoinForm
        coins={cryptoList}
        addCoin={onAddCoin}
        selectedCoin={selectedCoin}
      />
    </>
  );
};

export const AddCoinPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoinPage);
