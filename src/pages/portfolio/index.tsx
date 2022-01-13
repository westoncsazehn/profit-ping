// 3rd party libraries
import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
// local
import {
  COIN_DB,
  db,
  FBUser,
  getCryptoHistory,
  getCryptoList,
  UserContext
} from '../../api';
import { CryptoProgressCard } from '../shared/CryptoProgressCard';
import { format } from 'date-fns';

export const Portfolio = () => {
  const user = useContext<FBUser>(UserContext);
  const [coins, setCoins] = useState<any>();
  const { email } = user;
  console.log('portfolio user: ', user);

  useEffect(() => {
    const coinDbRef = collection(db, COIN_DB);
    const coinsQuery = query(coinDbRef, where('user', '==', email));

    // TODO: Split out into redux
    // TODO: Get list of user coins, then use ids to get CryptoList
    Promise.all([getCryptoList(), getDocs(coinsQuery)]).then((data) => {
      const [list, cryptos] = data;
      const resultCoins: any = [];
      cryptos.forEach((coin) => {
        const listItem = list.data
          .slice()
          .find((item) => item.id === coin.data().coin);
        const coinData = coin.data();
        const initialDate = coinData?.initialDate.toDate();
        const formattedCryptoHistoryDate: string = format(
          initialDate,
          'dd-MM-yyyy'
        );
        if (listItem && Object.keys(listItem).length > 0) {
          getCryptoHistory(
            String(listItem?.id),
            formattedCryptoHistoryDate
          ).then((cryptoHistory: any) => {
            const historyPrice =
              cryptoHistory?.data?.market_data?.current_price?.usd;
            const currenPriceUSD =
              Number(listItem.current_price) * coinData?.initialInvestment;
            const historyPriceUSD = historyPrice * coinData?.initialInvestment;
            const crypto = {
              name: listItem.name,
              id: listItem.id,
              symbol: listItem.symbol,
              image: listItem.image,
              initialDate,
              initialInvestment: coinData?.initialInvestment,
              gain: currenPriceUSD - historyPriceUSD,
              multiplier: (currenPriceUSD / historyPriceUSD).toFixed(2),
              targetMultiplier: 2,
              historyPrice,
              currenPriceUSD
            };
            resultCoins.push(crypto);
          });
        }
      });
      setCoins(resultCoins);
    });
  }, []);

  // TODO: move into redux pattern
  // calculate multiplier for each coin in portfolio
  // useEffect(() => {
  //   const functions = getFunctions();
  //   const initCryptoMultiplierCheck = httpsCallable(
  //     functions,
  //     'initCryptoMultiplierCheck'
  //   );
  //   console.log('init initCryptoMultiplierCheck');
  //   initCryptoMultiplierCheck().then((result) => {
  //     console.log('result', result);
  //   });
  // }, []);
  //
  // console.log('coins', coins);

  return (
    <>
      <h1>Portfolio page test</h1>
      {coins?.map((coin: any) => (
        <CryptoProgressCard key={JSON.stringify(coin)} coin={coin} />
      ))}
    </>
  );
};
