// 3rd party
import React from 'react';
import {
  Box,
  CardHeader,
  IconButton,
  TableCell,
  Typography
} from '@mui/material';
import { AlarmOff, Edit } from '@mui/icons-material';
// local
import {
  CoinActionsType,
  HeaderItem,
  PortfolioTableCoin
} from '../../../../store';
import {
  StyledAvatar,
  StyledLabelContentSpan,
  StyledRemoveCoinIconButton,
  StyledTableHeaderTitle,
  StyledTooltip,
  StyledTooltipIcon,
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
    avatar={<StyledAvatar alt={coin.name} src={coin.image} />}
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
          title={`Edit ${coin?.name || 'coin'} investment details.`}
          {...TOOLTIP_COMMON_PROPS}>
          <Edit />
        </StyledTooltip>
      </IconButton>
      <StyledRemoveCoinIconButton
        color="inherit"
        aria-label="remove coin"
        onClick={() => onRemoveCoin(coin)}>
        <StyledWarningTooltip
          title={`Remove ${coin?.name || 'coin'} and stop tracking multiplier.`}
          {...TOOLTIP_COMMON_PROPS}>
          <AlarmOff />
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
