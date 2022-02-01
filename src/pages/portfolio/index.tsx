// 3rd party libraries
import React, { useContext, useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
// local
import { messaging, UserContext } from '../../api';
import { ADD_COIN_URL } from '../meta-data/urls';
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
    getUsersCryptoList: (email: string) => dispatch(getUsersCryptoList(email)),
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
  const { coins = [], userDeviceToken = '', sortBy } = portfolio;
  const [deviceToken] = useState<string>(userDeviceToken);
  const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
    useState<boolean>(false);
  const { email } = user;

  const onRemoveCoin = (coin: PortfolioTableCoin) => {
    const { id = '' } = coin;
    if (id && email) removeCoin({ id, user: email });
  };
  const onEditCoin = (coin: PortfolioTableCoin) => {
    const { id = '' } = coin;
    if (id && email) navigate(`/${ADD_COIN_URL}/${id}`);
  };
  const onSortBy = (sortBy: SortByType) => {
    if (sortBy?.sortKey && sortBy?.direction) {
      sortCryptoList(sortBy);
    }
  };

  // get list of user's crypto with metadata
  useEffect(() => {
    if (email) {
      getUsersCryptoList(email);
    }
  }, []);

  // get user's device token
  useEffect(() => {
    if (email && !deviceToken) {
      getUserDeviceToken(email);
      setHasGetDeviceTokenRan(true);
    }
  }, [deviceToken, email, getUserDeviceToken]);

  // add user's device token to db if none exists
  useEffect(() => {
    if (email && !deviceToken && hasGetDeviceTokenRan) {
      addDeviceToken();
    }
  }, [addDeviceToken, deviceToken, email, hasGetDeviceTokenRan]);

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
    </Container>
  );
};
export const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
