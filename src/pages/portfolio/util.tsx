//3rd party
import React from 'react';
import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Typography } from '@mui/material';
// local
import { PortfolioCoinsResponse, PortfolioTableCoin } from '../../store';

const toUSD = (value: string | number): string =>
  `$${Number(value).toFixed(2)}`;
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
    <Typography
      color={
        isClosing
          ? 'text.primary'
          : value < comparedTo
          ? 'text.primary'
          : 'success.main'
      }>
      {isClosing ? '/' : ''}
      {isUSD ? '$' : ''}
      {formattedValue}
      {isX ? 'x' : ''}
    </Typography>
  );
};
const getGain = (value: number): ReactNode => (
  <Typography
    color={value > 0 ? 'success.main' : value < 0 ? 'error' : 'text.primary'}>
    {toUSD(value)}
  </Typography>
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

export const getFormattedTableValues = (
  coins: PortfolioCoinsResponse[]
): PortfolioTableCoin[] => {
  return coins.slice().map((coin: PortfolioCoinsResponse) => {
    const {
      initialDate,
      initialInvestment,
      targetMultiplier,
      historyPrice,
      currentPrice
    } = coin;
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
    return {
      ...coin,
      quantity: initialInvestment,
      initial: toUSD(historyPrice * initialInvestment),
      target: getTarget(currentPriceInUSD, targetInUSD, true),
      multiplier: getTarget(currentMultiplier, targetMultiplier, false, true),
      gain: getGain(currentPriceInUSD - historyPriceInUSD),
      initialDate: initialDateString,
      inProfit: currentPriceInUSD - historyPriceInUSD > 0
    };
  });
};
