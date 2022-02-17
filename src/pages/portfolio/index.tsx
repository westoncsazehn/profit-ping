// 3rd party
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
// local
import { DeleteItemConfirmModal, ADD_COIN_URL } from '../common';
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
  PortfolioTableCoin
} from '../../store';
import { PortfolioTable, formatCoinsForPortfolioTable } from './components';

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
  const navigate = useNavigate();
  const { coins = [], sortBy } = portfolio;
  const [coinToRemove, setCoinToRemove] = useState<PortfolioCoin | undefined>();
  const [tableCoins, setTableCoins] = useState<PortfolioTableCoin[]>([]);

  // get list of user's crypto with metadata
  useEffect(() => {
    if (uid) {
      getUsersCryptoList(uid);
    }
  }, []);
  useEffect(() => {
    if (coins?.length) {
      setTableCoins(formatCoinsForPortfolioTable(coins));
    }
  }, [coins]);

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
        coins={tableCoins}
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
