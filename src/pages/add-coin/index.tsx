// 3rd party libraries
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
// local
import { UserContext } from '../../api';
import {
  addCoin,
  FBUser,
  setIsLoading,
  FirestoreAddCoin,
  AppState,
  BasePortfolioCoin
} from '../../store';
import { AddCoinForm } from './components';
import { getList } from '../../store';
import { useParams } from 'react-router-dom';

const mapDispatchToProps = (dispatch: any) => ({
  setIsLoading: (isLoading?: boolean) => dispatch(setIsLoading(isLoading)),
  getList: (email: string, id: string = '') => dispatch(getList(email, id)),
  addCoin: (coin: FirestoreAddCoin, email: string) =>
    dispatch(addCoin(coin, email))
});
const mapStateToProps = ({ cryptoApi }: AppState) => cryptoApi;
export const AddCoinPage = ({
  cryptoList,
  addCoin,
  getList
}: {
  cryptoList: BasePortfolioCoin[];
  addCoin: any;
  getList: any;
}) => {
  const { email } = useContext<FBUser>(UserContext);
  const { id = '' } = useParams();

  // get list of coins for add coin form
  useEffect(() => getList(email, id), []);

  const onAddCoin = (coin: FirestoreAddCoin) => {
    if (email && coin) {
      addCoin(coin, email);
    }
  };
  return (
    <>
      <AddCoinForm coins={cryptoList} addCoin={onAddCoin} selectedCoin={id} />
    </>
  );
};

export const AddCoinPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCoinPage);
