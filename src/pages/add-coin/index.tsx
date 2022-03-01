// 3rd party
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// local
import {
  addCoin,
  FBUser,
  FirestoreAddCoin,
  AppState,
  BasePortfolioCoin,
  FirestoreCoin,
  getPortfolioCoin,
  updateCoin,
  Portfolio,
  PortfolioCoin
} from '../../store';
import { AddCoinForm } from './components';
import { PORTFOLIO_URL } from '../common';

const mapDispatchToProps = (dispatch: any) => ({
  addCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(addCoin(coin, uid)),
  updateCoin: (coin: FirestoreAddCoin, uid: string) =>
    dispatch(updateCoin(coin, uid)),
  getPortfolioCoin: (id: string, uid: string) =>
    dispatch(getPortfolioCoin(id, uid))
});
const mapStateToProps = ({
  cryptoApi,
  addCoin,
  user,
  portfolio
}: AppState) => ({
  ...cryptoApi,
  ...addCoin,
  portfolio,
  user
});
export const AddCoinPage = ({
  cryptoList,
  selectedCoin,
  user: { uid },
  portfolio,
  addCoin,
  updateCoin,
  getPortfolioCoin
}: {
  cryptoList: BasePortfolioCoin[];
  selectedCoin: FirestoreCoin;
  user: FBUser;
  portfolio: Portfolio;
  addCoin: any;
  updateCoin: any;
  getPortfolioCoin: any;
}) => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const coinIDList: string[] = portfolio?.coins
    .slice()
    .map((coin: PortfolioCoin) => coin.id);
  const [addCoinCryptoList, setAddCoinCryptoList] =
    useState<BasePortfolioCoin[]>(cryptoList);

  // if editing coin, filter cryptoList to show only that coin
  // if adding coin, display cryptoList without coins in portfolio
  useEffect(() => {
    const filteredCryptoList = cryptoList
      .slice()
      .filter((crypto: BasePortfolioCoin) =>
        id ? crypto.id === id : !coinIDList.includes(crypto.id)
      );
    setAddCoinCryptoList(filteredCryptoList);
  }, [id]);
  // if param id, get user's portfolio coin data
  useEffect(() => {
    if (uid) getPortfolioCoin(id, uid);
  }, []);

  // handlers
  const onAddCoin = (coin: FirestoreAddCoin) => {
    if (uid && coin) {
      id ? updateCoin(coin, uid) : addCoin(coin, uid);
    }
  };
  const onCancel = () => navigate(`/${PORTFOLIO_URL}`);

  return (
    <>
      <AddCoinForm
        coins={addCoinCryptoList}
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
