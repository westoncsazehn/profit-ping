// 3rd party
import React, { useContext, useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { useLocation, useNavigate } from 'react-router-dom';
// local
import { messaging, UserContext } from '../../api';
import { DeleteItemConfirmModal, ADD_COIN_URL, BASE_URL } from '../common';
import {
  CoinAction,
  PortfolioTableCoin,
  removeCoin,
  addDeviceToken,
  getDeviceToken,
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
    getUserDeviceToken: (payload: string) => dispatch(getDeviceToken(payload)),
    addDeviceToken: () => dispatch(addDeviceToken()),
    getUsersCryptoList: (uid: string) => dispatch(getUsersCryptoList(uid)),
    removeCoin: (coinAction: CoinAction) => dispatch(removeCoin(coinAction)),
    sortCryptoList: (sortBy: SortByType) => dispatch(sortCryptoList(sortBy))
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  portfolio,
  getUserDeviceToken,
  addDeviceToken,
  getUsersCryptoList,
  removeCoin,
  sortCryptoList
}: {
  portfolio: Portfolio;
  getUserDeviceToken: any;
  addDeviceToken: any;
  getUsersCryptoList: any;
  removeCoin: any;
  sortCryptoList: any;
} & AppState) => {
  const user = useContext<FBUser>(UserContext);
  const navigate = useNavigate();
  const { pathname = '' } = useLocation();
  const { coins = [], userDeviceToken = '', sortBy } = portfolio;
  const [deviceToken] = useState<string>(userDeviceToken);
  const [coinToRemove, setCoinToRemove] = useState<
    PortfolioTableCoin | undefined
  >();
  const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
    useState<boolean>(false);
  const { uid } = user;

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

  // for 404 cases, reload with correct path
  useEffect(() => {
    if (pathname !== BASE_URL) {
      navigate(BASE_URL);
    }
  }, [pathname]);

  // get list of user's crypto with metadata
  useEffect(() => {
    if (uid) {
      getUsersCryptoList(uid);
    }
  }, []);

  // get user's device token
  useEffect(() => {
    if (uid && !deviceToken) {
      getUserDeviceToken(uid);
      setHasGetDeviceTokenRan(true);
    }
  }, [deviceToken, uid, getUserDeviceToken]);

  // add user's device token to db if none exists
  useEffect(() => {
    if (uid && !deviceToken && hasGetDeviceTokenRan) {
      addDeviceToken();
    }
  }, [addDeviceToken, deviceToken, uid, hasGetDeviceTokenRan]);

  // subscribe to messaging notifications
  useEffect(() => {
    onMessage(messaging, (payload) => {
      // TODO: implement alert to display message
    });
  }, []);

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
