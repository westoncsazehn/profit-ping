// 3rd party
import React from 'react';
import { Avatar, Box, CardHeader, IconButton, TableCell } from '@mui/material';
import { AlarmOff, Edit } from '@mui/icons-material';
// local
import { HeaderItem, PortfolioTableCoin } from '../../../../store';

export const headerItems: HeaderItem[] = [
  {
    label: 'Coin',
    value: 'name',
    sortKey: 'nameSortValue'
  },
  {
    label: 'Quantity',
    value: 'quantity',
    sortKey: 'quantity'
  },
  {
    label: 'Initial Investment',
    value: 'initialUSD',
    sortKey: 'initialUSDSortValue'
  },
  {
    label: 'Initial Date',
    value: 'initialDate'
  },
  {
    label: 'Target',
    value: 'target'
  },
  {
    label: 'Gain',
    value: 'gain',
    sortKey: 'gainSortValue'
  },
  {
    label: 'Multiplier',
    value: 'multiplier',
    sortKey: 'multiplierSortValue'
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
type CoinActions = {
  onRemoveCoin: (coin: PortfolioTableCoin) => void;
  onEditCoin: (coin: PortfolioTableCoin) => void;
};
export const getCoinActionContent = (
  coin: PortfolioTableCoin,
  { onRemoveCoin, onEditCoin }: CoinActions
) => {
  return (
    <>
      <Box>
        <IconButton
          color="inherit"
          aria-label="edit coin"
          onClick={() => onEditCoin(coin)}>
          <Edit />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="remove coin"
          onClick={() => onRemoveCoin(coin)}>
          <AlarmOff />
        </IconButton>
      </Box>
    </>
  );
};
export const getTableCellContent = (
  coin: PortfolioTableCoin,
  key: keyof PortfolioTableCoin,
  index: number,
  actions: CoinActions
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
