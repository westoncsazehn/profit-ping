// 3rd party
import { format, getTime } from 'date-fns';
import React, { ReactNode } from 'react';
import { styled, Typography } from '@mui/material';
// local
import {
  BasePortfolioCoin,
  GeckoCoinHistoryItem,
  FirestoreCoin,
  PortfolioTableCoin,
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

const StyledTypography = styled(Typography)(() => ({
  display: 'inline-block'
}));
const StyledDividerTypography = styled('span')(() => ({
  padding: '0 5px',
  display: 'inline-block'
}));
const Divider = () => <StyledDividerTypography>/</StyledDividerTypography>;
const getCompareTypography = (
  value: number,
  comparedTo: number,
  isUSD?: boolean,
  isX?: boolean,
  isClosing?: boolean
) => {
  const displayValue: number = isClosing ? comparedTo : value;
  const formattedValue: string =
    isUSD || isX ? displayValue.toFixed(2) : String(displayValue);
  return (
    <StyledTypography
      color={
        isClosing
          ? 'text.primary'
          : value < comparedTo
          ? 'text.primary'
          : 'success.main'
      }>
      {isClosing ? <Divider /> : null}
      {isUSD ? '$' : ''}
      {formattedValue}
      {isX ? 'x' : ''}
    </StyledTypography>
  );
};
const getGain = (value: number): ReactNode => (
  <StyledTypography
    color={value > 0 ? 'success.main' : value < 0 ? 'error' : 'text.primary'}>
    {toUSD(value)}
  </StyledTypography>
);
const getTarget = (
  value: number,
  comparedTo: number,
  isUSD?: boolean,
  isX?: boolean
): ReactNode => (
  <>
    {getCompareTypography(value, comparedTo, isUSD, isX)}
    {getCompareTypography(value, comparedTo, isUSD, isX, true)}
  </>
);
const toUSD = (value: string | number): string =>
  `$${Number(value).toFixed(2)}`;
export const getFormattedUserCoinsList = (
  userCoinList: FirestoreCoin[],
  geckoCurrentList: BasePortfolioCoin[],
  geckoHistoryList: GeckoCoinHistoryItem[]
): PortfolioTableCoin[] => {
  const userCoinPortfolio: PortfolioTableCoin[] = [];
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
      initialUSD: toUSD(initialPrice),
      initialUSDSortValue: initialPrice,
      target: getTarget(currentPriceInUSD, targetInUSD, true),
      multiplier: getTarget(currentMultiplier, targetMultiplier, false, true),
      multiplierSortValue: targetMultiplier,
      gain: getGain(gainValue),
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
  coins: PortfolioTableCoin[],
  { sortKey, direction }: SortByType
): PortfolioTableCoin[] => {
  return coins.slice().sort((a: PortfolioTableCoin, b: PortfolioTableCoin) => {
    const aValue: SortValueType = a[
      sortKey as keyof PortfolioTableCoin
    ] as SortValueType;
    const bValue: SortValueType = b[
      sortKey as keyof PortfolioTableCoin
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
