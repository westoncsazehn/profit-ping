// 3rd party libraries
import React, { useContext, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { connect } from 'react-redux';
// local
import {
  app,
  COIN_DB,
  CoinMetrics,
  db,
  DEVICE_TOKEN_DB,
  getCryptoHistory,
  getCryptoList,
  messaging,
  UserContext
} from '../../api';
import { CryptoProgressCard } from '../shared';
import { format } from 'date-fns';
import { FBUser, Portfolio } from '../../store/types';
import * as actionTypes from '../../store/portfolio/actions';
import { addDeviceToken, getDeviceToken } from '../../store/portfolio/actions';
import { AppState } from '../../store';

// TODO: figure correct type for dispatch param here
const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserDeviceToken: (payload: string) =>
      dispatch(actionTypes.getDeviceToken(payload)),
    addDeviceToken: () => dispatch(actionTypes.addDeviceToken())
  };
};
const mapStateToProps = (state: AppState) => state;
const PortfolioPage = (props: {
  user: FBUser;
  portfolio: Portfolio;
  getUserDeviceToken: any;
  addDeviceToken: any;
}) => {
  console.log('props', props);
  // const [coins] = useState<any>();
  // const [deviceToken] = useState<string>(
  //   state?.portfolio?.userDeviceToken || ''
  // );
  // const [hasGetDeviceTokenRan, setHasGetDeviceTokenRan] =
  //   useState<boolean>(false);
  // const { email } = state.user;
  //
  // // const addDeviceToken = async ({ deviceToken, user }: DeviceTokenData) => {
  // //   await addDoc(collection(db, DEVICE_TOKEN_DB), {
  // //     deviceToken,
  // //     user
  // //   });
  // // };
  //
  // // get user's device token
  // useEffect(() => {
  //   if (email && !deviceToken) {
  //     getUserDeviceToken(email);
  //     setHasGetDeviceTokenRan(true);
  //   }
  // }, [deviceToken, email, getUserDeviceToken]);
  //
  // // add user's device token to db if none exists
  // useEffect(() => {
  //   if (email && !deviceToken && hasGetDeviceTokenRan) {
  //     addDeviceToken();
  //   }
  // }, [addDeviceToken, deviceToken, email, hasGetDeviceTokenRan]);
  //
  // // if no device token, then retrieve and add to `deviceToken` collection
  // useEffect(() => {
  //   console.log('messaging', messaging);
  // }, []);

  // useEffect(() => {
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received: ', payload);
  //   });
  // }, []);

  // useEffect(() => {
  //   const coinDbRef = collection(db, COIN_DB);
  //   const coinsQuery = query(coinDbRef, where('user', '==', email));
  //
  //   // TODO: Split out into redux
  //   // TODO: Get list of user coins, then use ids to get CryptoList
  //   Promise.all([getCryptoList(), getDocs(coinsQuery)]).then((data) => {
  //     const [list, cryptos] = data;
  //     const resultCoins: any = [];
  //     cryptos.forEach((coin) => {
  //       const listItem = list.data
  //         .slice()
  //         .find((item) => item.id === coin.data().coin);
  //       const coinData = coin.data();
  //       const initialDate = coinData?.initialDate.toDate();
  //       const formattedCryptoHistoryDate: string = format(
  //         initialDate,
  //         'dd-MM-yyyy'
  //       );
  //       if (listItem && Object.keys(listItem).length > 0) {
  //         getCryptoHistory(
  //           String(listItem?.id),
  //           formattedCryptoHistoryDate
  //         ).then((cryptoHistory: any) => {
  //           const historyPrice =
  //             cryptoHistory?.data?.market_data?.current_price?.usd;
  //           const currenPriceUSD =
  //             Number(listItem.current_price) * coinData?.initialInvestment;
  //           const historyPriceUSD = historyPrice * coinData?.initialInvestment;
  //           const crypto = {
  //             name: listItem.name,
  //             id: listItem.id,
  //             symbol: listItem.symbol,
  //             image: listItem.image,
  //             initialDate,
  //             initialInvestment: coinData?.initialInvestment,
  //             gain: currenPriceUSD - historyPriceUSD,
  //             multiplier: (currenPriceUSD / historyPriceUSD).toFixed(2),
  //             targetMultiplier: 2,
  //             historyPrice,
  //             currenPriceUSD
  //           };
  //           resultCoins.push(crypto);
  //         });
  //       }
  //     });
  //     setCoins(resultCoins);
  //   });
  // }, []);

  // TODO: move into redux pattern
  // calculate multiplier for each coin in portfolio
  // useEffect(() => {
  //   const functions = getFunctions();
  //   const initCryptoMultiplierCheck = httpsCallable(
  //     functions,
  //     'initCryptoMultiplierCheck'
  //   );
  // calculate percentage out of multiTarget reached
  // const percentChange: number = Number(
  //   Math.round((currentPriceUSD * 100) / multiTargetUSD).toFixed(2)
  // );
  // const multiplier: number = currentPriceUSD / initialPriceUSD;
  // const currentMultiplier: number = Number(
  //   (currentPriceUSD / initialPriceUSD).toFixed(3)
  // );
  //   console.log('init initCryptoMultiplierCheck');
  //   initCryptoMultiplierCheck().then((result) => {
  //     console.log('result', result);
  //   });
  // }, []);
  //
  // console.log('coins', coins);

  return (
    <>
      {/*<h1>Portfolio page test</h1>*/}
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
