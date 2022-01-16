// 3rd party libraries
import React, { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
// local
import { messaging } from '../../api';
import { CryptoProgressCard } from '../shared';
import {
  addDeviceToken,
  getDeviceToken,
  getUsersCryptoList,
  FBUser,
  Portfolio
} from '../../store';
import { AppState } from '../../store';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserDeviceToken: (payload: string) => dispatch(getDeviceToken(payload)),
    addDeviceToken: () => dispatch(addDeviceToken()),
    getUsersCryptoList: () => dispatch(getUsersCryptoList())
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = ({
  user,
  portfolio,
  getUserDeviceToken,
  addDeviceToken,
  getUsersCryptoList
}: {
  user: FBUser;
  portfolio: Portfolio;
  getUserDeviceToken: any;
  addDeviceToken: any;
  getUsersCryptoList: any;
}) => {
  const { coins = [], userDeviceToken = '' } = portfolio;
  console.log('coins', coins);
  const [deviceToken] = useState<string>(userDeviceToken);
  const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
    useState<boolean>(false);
  const { email } = user;

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
      console.clear();
      console.log('Message received: ', payload);
    });
  }, []);

  // get list of user's crypto with metadata
  useEffect(() => {
    getUsersCryptoList();
  }, []);

  return (
    <>
      <h1>Portfolio page test</h1>
      {/*{coins?.map((coin: any) => (*/}
      {/*  <CryptoProgressCard key={JSON.stringify(coin)} coin={coin} />*/}
      {/*))}*/}
    </>
  );
};
export const PortfolioPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage);
