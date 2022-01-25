// 3rd party libraries
import { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
// local
import {
  db,
  GeckoCoin,
  COIN_DB,
  UserContext,
  getCryptoList,
  getCryptoHistory,
  FirestoreAddCoin
} from '../../api';
import { FBUser } from '../../store';
import { AddCoinForm } from './components/AddCoinForm';
import { Typography } from '@mui/material';

export const CoinPage = () => {
  const { email } = useContext<FBUser>(UserContext);
  const [coins, setCoins] = useState<GeckoCoin[]>();

  // no coin param
  useEffect(() => {
    getCryptoList().then((list: AxiosResponse<GeckoCoin[]>) =>
      setCoins(list.data)
    );
  }, []);

  // add logic to prevent coin from being added if added already
  const addCoin = async ({
    initialDate,
    initialInvestment,
    coin,
    targetMultiplier
  }: FirestoreAddCoin) => {
    const date: Date =
      typeof initialDate === 'string' ? new Date(initialDate) : initialDate;
    const stringDate: string = format(date, 'dd-MM-yyyy');
    const history = await getCryptoHistory(coin, stringDate);
    const {
      market_data: {
        current_price: { usd: initialPriceUSD }
      }
    } = history?.data;
    const initialPricePerCoin: number = Number(initialPriceUSD.toFixed(2));
    await addDoc(collection(db, COIN_DB), {
      user: email,
      coin,
      initialDate: Timestamp.fromDate(new Date(initialDate)),
      initialInvestment,
      targetMultiplier,
      initialPricePerCoin
    });
  };

  return <>{coins && <AddCoinForm coins={coins} addCoin={addCoin} />}</>;
};
