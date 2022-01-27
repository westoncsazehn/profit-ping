// 3rd party libraries
import React, { useContext, useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
// local
import { messaging, UserContext } from '../../api';
import {
  CoinAction,
  PortfolioTableCoin,
  removeCoin,
  takeProfit,
  addDeviceToken,
  getDeviceToken,
  getUsersCryptoList,
  FBUser,
  Portfolio,
  AppState
} from '../../store';
import { PortfolioTable } from './components';
import { getFormattedTableValues } from './util';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserDeviceToken: (payload: string) => dispatch(getDeviceToken(payload)),
    addDeviceToken: () => dispatch(addDeviceToken()),
    getUsersCryptoList: (email: string) => dispatch(getUsersCryptoList(email)),
    removeCoin: (coinAction: CoinAction) => dispatch(removeCoin(coinAction)),
    takeProfit: (coinAction: CoinAction) => dispatch(takeProfit(coinAction))
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  portfolio,
  getUserDeviceToken,
  addDeviceToken,
  getUsersCryptoList,
  removeCoin,
  takeProfit
}: {
  portfolio: Portfolio;
  getUserDeviceToken: any;
  addDeviceToken: any;
  getUsersCryptoList: any;
  removeCoin: any;
  takeProfit: any;
} & AppState) => {
  const user = useContext<FBUser>(UserContext);
  const { coins = [], userDeviceToken = '' } = portfolio;
  const tableFormattedCoins: PortfolioTableCoin[] =
    getFormattedTableValues(coins);
  const [deviceToken] = useState<string>(userDeviceToken);
  const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
    useState<boolean>(false);
  const { email } = user;

  const onRemoveCoin = (coin: PortfolioTableCoin) => {
    const { id = '' } = coin;
    if (id && email) removeCoin({ id, user: email });
  };
  const onTakeProfit = (coin: PortfolioTableCoin) => {
    const { id = '' } = coin;
    if (id && email) takeProfit({ id, user: email });
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
        coins={tableFormattedCoins}
        onRemoveCoin={onRemoveCoin}
        onTakeProfit={onTakeProfit}
      />
    </Container>
  );
};
export const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
