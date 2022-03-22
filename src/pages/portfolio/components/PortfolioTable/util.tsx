// 3rd party
import { Close, Edit } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import {
  Box,
  CardHeader,
  IconButton,
  TableCell,
  Typography,
  Avatar
} from '@mui/material';
// local
import {
  CoinActionsType,
  HeaderItem,
  PortfolioCoin,
  PortfolioTableCoin
} from '../../../../store';
import {
  StyledDividerTypography,
  StyledLabelContentSpan,
  StyledRemoveCoinIconButton,
  StyledTableHeaderTitle,
  StyledTooltip,
  StyledTooltipIcon,
  StyledTypography,
  StyledWarningTooltip,
  TOOLTIP_COMMON_PROPS
} from './styles';

export const headerItems: HeaderItem[] = [
  {
    label: 'Coin',
    value: 'name',
    sortKey: 'nameSortValue'
  },
  {
    label: 'Quantity',
    value: 'quantity',
    sortKey: 'quantity',
    tooltip: 'Number of coins initially invested.'
  },
  {
    label: 'Initial Investment',
    value: 'initialUSD',
    sortKey: 'initialUSDSortValue',
    tooltip: '(Quantity of coins) x (Price of coin based on initial date)'
  },
  {
    label: 'Initial Date',
    value: 'initialDate',
    tooltip: 'Date of initial coin purchase.'
  },
  {
    label: 'Target',
    value: 'target',
    tooltip: '(Current investment value) / (Target multiplier value)'
  },
  {
    label: 'Gain',
    value: 'gain',
    sortKey: 'gainSortValue',
    tooltip: 'Amount of unrealized profits.'
  },
  {
    label: 'Multiplier',
    value: 'multiplier',
    sortKey: 'multiplierSortValue',
    tooltip: 'Target multiplier set to trigger message.'
  },
  {
    label: 'Action',
    value: 'action'
  }
];
export const rowKeys: string[] = headerItems
  .slice()
  .map((item) => item.value as string);
export const getCoinNameCellContent = (coin: PortfolioTableCoin) => (
  <CardHeader
    sx={{ p: 0 }}
    avatar={<Avatar alt={coin.name} src={coin.image} />}
    title={coin.symbol}
  />
);

export const getCoinActionContent = (
  coin: PortfolioTableCoin,
  { onRemoveCoin, onEditCoin }: CoinActionsType
) => (
  <>
    <Box>
      <IconButton
        color="inherit"
        aria-label="edit coin"
        onClick={() => onEditCoin(coin)}>
        <StyledTooltip
          title={
            <Typography>
              Edit {coin?.name || 'coin'} investment details.
            </Typography>
          }
          {...TOOLTIP_COMMON_PROPS}>
          <Edit />
        </StyledTooltip>
      </IconButton>
      <StyledRemoveCoinIconButton
        color="inherit"
        aria-label="remove coin"
        onClick={() => onRemoveCoin(coin)}>
        <StyledWarningTooltip
          title={
            <Typography>
              Remove {coin?.name || 'coin'} and stop tracking multiplier.
            </Typography>
          }
          {...TOOLTIP_COMMON_PROPS}>
          <Close color="error" />
        </StyledWarningTooltip>
      </StyledRemoveCoinIconButton>
    </Box>
  </>
);
export const getTableCellContent = (
  coin: PortfolioTableCoin,
  key: keyof PortfolioTableCoin,
  index: number,
  actions: CoinActionsType
) => {
  const item =
    key === 'name' ? (
      getCoinNameCellContent(coin)
    ) : key === 'action' ? (
      getCoinActionContent(coin, actions)
    ) : (
      <>{coin[key]}</>
    );
  return <TableCell key={key + index} align="left" children={item} />;
};
export const getTableHeaderTitle = (header: HeaderItem) => {
  // @ts-ignore
  const title = (
    <StyledTableHeaderTitle color="text.main">
      {header?.label}
    </StyledTableHeaderTitle>
  );
  return (
    <StyledLabelContentSpan>
      {title}
      {header?.tooltip ? (
        <StyledTooltip title={String(header.tooltip)} {...TOOLTIP_COMMON_PROPS}>
          <StyledTooltipIcon />
        </StyledTooltip>
      ) : null}
    </StyledLabelContentSpan>
  );
};

// Portfolio > index > Formats coin values for PortfolioTable.tsx
const toUSD = (value: string | number): string =>
  `$${Number(value).toFixed(2)}`;
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
export const formatCoinsForPortfolioTable = (
  coins: PortfolioCoin[]
): PortfolioTableCoin[] =>
  coins?.slice()?.map((coin: PortfolioCoin) => {
    const {
      initialUSD,
      currentPriceInUSD,
      targetInUSD,
      currentMultiplier,
      targetMultiplier,
      gain
    } = coin;
    return {
      ...coin,
      initialUSD: toUSD(initialUSD),
      target: getTarget(currentPriceInUSD, targetInUSD, true),
      multiplier: getTarget(currentMultiplier, targetMultiplier, false, true),
      gain: getGain(gain)
    };
  });
