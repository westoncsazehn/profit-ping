//3rd party
import React from 'react';
import { format, getTime } from 'date-fns';
import { ReactNode } from 'react';
import { styled, Typography } from '@mui/material';
// local
import { PortfolioCoinsResponse, PortfolioTableCoin } from '../../store';

const StyledTypography = styled(Typography)(() => ({
  display: 'inline-block'
}));
const StyledDividerTypography = styled('span')(() => ({
  padding: '0 5px',
  display: 'inline-block'
}));
const Divider = () => <StyledDividerTypography>/</StyledDividerTypography>;
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
    const initialPrice: number = historyPrice * initialInvestment;
    const gainValue: number = currentPriceInUSD - historyPriceInUSD;
    // TODO: getTime based on initialDate value
    const dateSortValue: number = getTime(new Date());
    return {
      ...coin,
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
    };
  });
};
