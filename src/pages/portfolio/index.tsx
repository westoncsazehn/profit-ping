// 3rd party libraries
import React, { useContext, useEffect, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
// local
import { messaging, UserContext } from '../../api';
import {
  addDeviceToken,
  getDeviceToken,
  getUsersCryptoList,
  FBUser,
  Portfolio
} from '../../store';
import { AppState } from '../../store';
import { PortfolioTable } from './components';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserDeviceToken: (payload: string) => dispatch(getDeviceToken(payload)),
    addDeviceToken: () => dispatch(addDeviceToken()),
    getUsersCryptoList: (email: string) => dispatch(getUsersCryptoList(email))
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  portfolio,
  getUserDeviceToken,
  addDeviceToken,
  getUsersCryptoList
}: {
  portfolio: Portfolio;
  getUserDeviceToken: any;
  addDeviceToken: any;
  getUsersCryptoList: any;
} & AppState) => {
  const user = useContext<FBUser>(UserContext);
  const { coins = [], userDeviceToken = '' } = portfolio;
  const [deviceToken] = useState<string>(userDeviceToken);
  const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
    useState<boolean>(false);
  const { email } = user;

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
      <PortfolioTable coins={coins} />
    </Container>
  );
};
export const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
