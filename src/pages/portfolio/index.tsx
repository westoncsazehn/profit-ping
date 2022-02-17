// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
// local
import { UserContext } from '../../api';
import { DeleteItemConfirmModal, ADD_COIN_URL } from '../common';
import {
  CoinAction,
  PortfolioTableCoin,
  removeCoin,
  getUsersCryptoList,
  FBUser,
  Portfolio,
  AppState,
  sortCryptoList,
  SortByType
} from '../../store';
import { PortfolioTable } from './components';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsersCryptoList: (uid: string) => dispatch(getUsersCryptoList(uid)),
    removeCoin: (coinAction: CoinAction) => dispatch(removeCoin(coinAction)),
    sortCryptoList: (sortBy: SortByType) => dispatch(sortCryptoList(sortBy))
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  portfolio,
  user: { uid },
  getUsersCryptoList,
  removeCoin,
  sortCryptoList
}: {
  portfolio: Portfolio;
  user: FBUser;
  getUsersCryptoList: any;
  removeCoin: any;
  sortCryptoList: any;
} & AppState) => {
  console.log('portfolio user', uid);
  const navigate = useNavigate();
  const { coins = [], sortBy } = portfolio;
  const [coinToRemove, setCoinToRemove] = useState<
    PortfolioTableCoin | undefined
  >();

  // get list of user's crypto with metadata
  useEffect(() => {
    if (uid) {
      getUsersCryptoList(uid);
    }
  }, []);

  // handlers
  const onRemoveCoin = (coin: PortfolioTableCoin) => {
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
  const onEditCoin = (coin: PortfolioTableCoin) => {
    const { id = '' } = coin;
    if (id && uid) navigate(`/${ADD_COIN_URL}/${id}`);
  };
  const onSortBy = (sortBy: SortByType) => {
    if (sortBy?.sortKey && sortBy?.direction) {
      sortCryptoList(sortBy);
    }
  };

  return (
    <Container>
      <PortfolioTable
        coins={coins}
        onRemoveCoin={onRemoveCoin}
        onEditCoin={onEditCoin}
        onSortBy={onSortBy}
        sortBy={sortBy}
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
    </Container>
  );
};
export const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
