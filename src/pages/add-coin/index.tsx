// 3rd party libraries
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
  addCoin: (coin: FirestoreAddCoin, email: string) =>
    dispatch(addCoin(coin, email)),
  updateCoin: (coin: FirestoreAddCoin, email: string) =>
    dispatch(updateCoin(coin, email)),
  getList: (email: string, id: string = '') => dispatch(getList(email, id)),
  getPortfolioCoin: (id: string, email: string) =>
    dispatch(getPortfolioCoin(id, email))
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
  const { email } = useContext<FBUser>(UserContext);
  const { id = '' } = useParams();

  // get list of coins for add coin form
  useEffect(() => getList(email, id), []);
  // if param id, get user's portfolio coin data
  useEffect(() => {
    if (email) getPortfolioCoin(id, email);
  }, []);

  const onAddCoin = (coin: FirestoreAddCoin) => {
    if (email && coin) {
      id ? updateCoin(coin, email) : addCoin(coin, email);
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
