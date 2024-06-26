// 3rd party
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
// local
import { PortfolioTable, formatCoinsForPortfolioTable } from './components';
import {
  DeleteItemConfirmModal,
  ADD_COIN_URL,
  SubscribeModal,
  PLAN_URL
} from '../common';
import {
  CoinAction,
  PortfolioCoin,
  removeCoin,
  getUsersCryptoList,
  FBUser,
  Portfolio,
  AppState,
  sortCryptoList,
  SortByType,
  PortfolioTableCoin,
  getList,
  CryptoApiStateType,
  navigateTo,
  resetSelectedCoin
} from '../../store';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsersCryptoList: (uid: string) => dispatch(getUsersCryptoList(uid)),
    removeCoin: (coinAction: CoinAction) => dispatch(removeCoin(coinAction)),
    sortCryptoList: (sortBy: SortByType) => dispatch(sortCryptoList(sortBy)),
    getList: () => dispatch(getList()),
    navigateTo: (path: string) => dispatch(navigateTo(path)),
    resetSelectedCoin: () => dispatch(resetSelectedCoin())
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  portfolio,
  cryptoApi,
  user: { uid, isSubscribed },
  navigateTo,
  getUsersCryptoList,
  removeCoin,
  sortCryptoList,
  getList,
  resetSelectedCoin
}: {
  portfolio: Portfolio;
  cryptoApi: CryptoApiStateType;
  user: FBUser;
  getUsersCryptoList: any;
  removeCoin: any;
  sortCryptoList: any;
  getList: any;
  navigateTo: any;
  resetSelectedCoin: any;
} & AppState) => {
  const { cryptoList } = cryptoApi;
  const { coins = [], sortBy } = portfolio;
  const [coinToRemove, setCoinToRemove] = useState<PortfolioCoin | undefined>();
  const [tableCoins, setTableCoins] = useState<PortfolioTableCoin[]>([]);
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  // reset selected coin on page init
  // use case: add-coin page > menu nav click > portfolio
  useEffect(() => resetSelectedCoin(), []);
  // get list of user's crypto with metadata
  useEffect(() => {
    if (uid) {
      getUsersCryptoList(uid);
    }
  }, [uid]);
  // format table cells to display styling
  useEffect(() => {
    setTableCoins(formatCoinsForPortfolioTable(coins));
  }, [coins]);
  // get list of coins for add coin form
  // called here to limit number of calls to 1
  useEffect(() => {
    getList();
  }, []);

  // handlers
  const onRemoveCoin = (coin: PortfolioCoin) => {
    if (Boolean(coin)) setCoinToRemove(coin);
  };
  const closeModal = () => setCoinToRemove(undefined);
  const submitModal = () => {
    if (coinToRemove) {
      const { id = '' } = coinToRemove;
      if (id && uid) removeCoin({ id, user: uid });
      closeModal();
    }
  };
  const onEditCoin = (coin: PortfolioCoin) => {
    const { id = '' } = coin;
    if (id && uid) navigateTo(`${ADD_COIN_URL}/${id}`);
  };
  const onSortBy = (sortBy: SortByType) => {
    if (sortBy?.sortKey && sortBy?.direction) {
      sortCryptoList(sortBy);
    }
  };
  const onSubmitSubscribeModal = () => {
    setIsSubscribing(false);
    navigateTo(PLAN_URL);
  };

  return (
    <Container>
      <PortfolioTable
        coins={tableCoins}
        onRemoveCoin={onRemoveCoin}
        onEditCoin={onEditCoin}
        onSortBy={onSortBy}
        sortBy={sortBy}
        navigateTo={navigateTo}
        isSubscribed={isSubscribed}
        onInitSignUp={() => setIsSubscribing(true)}
      />
      <DeleteItemConfirmModal
        open={Boolean(coinToRemove)}
        closeModal={closeModal}
        submit={submitModal}
        title="Portfolio Coin Removal"
        description={`Are you sure you wish to remove ${
          coinToRemove?.name || 'this coin'
        }?`}
      />
      <SubscribeModal
        open={isSubscribing}
        closeModal={() => setIsSubscribing(false)}
        submit={onSubmitSubscribeModal}
        title="Subscribe to Profit Ping Plus"
        description={`Looks like you've met the free-tier limit. Unlock
         full-access to Profit Ping features by subscribing today.`}
      />
    </Container>
  );
};
const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
export default PortfolioPageRx;
