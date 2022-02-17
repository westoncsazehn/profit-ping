// 3rd party
import { format, getTime } from 'date-fns';
import React, { ReactNode } from 'react';
import { styled, Typography } from '@mui/material';
// local
import {
  BasePortfolioCoin,
  GeckoCoinHistoryItem,
  FirestoreCoin,
  PortfolioCoin,
  SortByType
} from '../types';

const getHistoryPrice = (
  id: string,
  cryptoHistoryItem: GeckoCoinHistoryItem[]
): number => {
  const historyItem: GeckoCoinHistoryItem | undefined = cryptoHistoryItem.find(
    ({ data }: GeckoCoinHistoryItem) => data.id === id
  );
  if (!historyItem) {
    throw new Error(`crypto: ${id} history not found from api`);
  }
  return Number(historyItem?.data?.market_data?.current_price?.usd);
};
const getCurrentGeckoCrypto = (
  id: string,
  cryptoCurrentItem: BasePortfolioCoin[]
): BasePortfolioCoin => {
  const currentItem: BasePortfolioCoin | undefined = cryptoCurrentItem.find(
    (geckoCoin: BasePortfolioCoin) => geckoCoin.id === id
  );
  if (!currentItem) {
    throw new Error(`crypto: ${id} not found from api`);
  }
  return currentItem;
};

export const getFormattedUserCoinsList = (
  userCoinList: FirestoreCoin[],
  geckoCurrentList: BasePortfolioCoin[],
  geckoHistoryList: GeckoCoinHistoryItem[]
): PortfolioCoin[] => {
  const userCoinPortfolio: PortfolioCoin[] = [];
  userCoinList.forEach((coin: FirestoreCoin) => {
    const { initialDate, initialInvestment, targetMultiplier } = coin;
    const historyPrice = getHistoryPrice(coin?.coin, geckoHistoryList);
    const currentIem = getCurrentGeckoCrypto(coin?.coin, geckoCurrentList);
    const {
      name,
      id,
      symbol,
      image,
      current_price: currentPrice = 0
    } = currentIem;
    const historyPriceInUSD: number = Number(
      (historyPrice * initialInvestment).toFixed(2)
    );
    const currentPriceInUSD: number = currentPrice * initialInvestment;
    const targetInUSD: number = historyPriceInUSD * targetMultiplier;
    const currentMultiplier: number = currentPriceInUSD / historyPriceInUSD;
    const initialDateString: string = format(
      // @ts-ignore
      initialDate.toDate(),
      'MM-dd-yyyy'
    );
    const initialPrice: number = historyPrice * initialInvestment;
    const gainValue: number = currentPriceInUSD - historyPriceInUSD;
    // TODO: getTime based on initialDate value
    const dateSortValue: number = getTime(new Date());
    userCoinPortfolio.push({
      id,
      name,
      nameSortValue: symbol,
      image,
      symbol: symbol.toUpperCase(),
      quantity: initialInvestment,
      initialUSD: initialPrice,
      initialUSDSortValue: initialPrice,
      currentPriceInUSD,
      targetInUSD,
      currentMultiplier,
      targetMultiplier,
      target: 0,
      multiplier: 0,
      gain: gainValue,
      multiplierSortValue: targetMultiplier,
      gainSortValue: gainValue,
      initialDate: initialDateString,
      initialDateSortValue: dateSortValue,
      inProfit: currentPriceInUSD - historyPriceInUSD > 0
    });
  });
  return userCoinPortfolio;
};

type SortValueType = number | string | Date;
export const sortCoins = (
  coins: PortfolioCoin[],
  { sortKey, direction }: SortByType
): PortfolioCoin[] => {
  return coins.slice().sort((a: PortfolioCoin, b: PortfolioCoin) => {
    const aValue: SortValueType = a[
      sortKey as keyof PortfolioCoin
    ] as SortValueType;
    const bValue: SortValueType = b[
      sortKey as keyof PortfolioCoin
    ] as SortValueType;
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const difference: number = aValue - bValue;
      return direction === 'desc' ? -1 * difference : difference;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const stringSortDirection: number = aValue < bValue ? -1 : 1;
      return direction === 'desc'
        ? -1 * stringSortDirection
        : stringSortDirection;
    }
    // TODO: implement date sorting
    return 0;
  });
};
