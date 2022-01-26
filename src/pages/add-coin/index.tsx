// 3rd party libraries
import { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// local
import {
  GeckoCoin,
  UserContext,
  getCryptoList,
  FirestoreAddCoin
} from '../../api';
import { addCoin, FBUser, setIsLoading } from '../../store';
import { AddCoinForm } from './components';

const mapDispatchToProps = (dispatch: any) => ({
  setIsLoading: (isLoading?: boolean) => dispatch(setIsLoading(isLoading)),
  addCoin: (coin: FirestoreAddCoin, email: string) =>
    dispatch(addCoin(coin, email))
});
export const AddCoinPage = ({
  setIsLoading,
  addCoin
}: {
  setIsLoading: any;
  addCoin: any;
}) => {
  const { email } = useContext<FBUser>(UserContext);
  const [coins, setCoins] = useState<GeckoCoin[]>();

  // no coin param
  useEffect(() => {
    if (!coins?.length) setIsLoading(true);
    getCryptoList().then((list: AxiosResponse<GeckoCoin[]>) => {
      setCoins(list.data);
      setIsLoading(false);
    });
  }, []);

  const onAddCoin = (coin: FirestoreAddCoin) => {
    console.log('onAddCoin coin', coin);
    if (email && coin) addCoin(coin, email);
  };

  // TODO: add logic to prevent coin from being added if added already

  return <>{coins && <AddCoinForm coins={coins} addCoin={onAddCoin} />}</>;
};

export const AddCoinPageRx = connect(null, mapDispatchToProps)(AddCoinPage);
