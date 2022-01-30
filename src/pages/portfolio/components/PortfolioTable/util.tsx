// 3rd party
import React from 'react';
import { Avatar, Box, CardHeader, IconButton, TableCell } from '@mui/material';
import {Close, Edit, PriceCheck} from '@mui/icons-material';
// local
import { HeaderItem, PortfolioTableCoin } from '../../../../store';

export const headerItems: HeaderItem[] = [
  {
    label: 'Coin',
    value: 'name'
  },
  {
    label: 'Quantity',
    value: 'quantity'
  },
  {
    label: 'Initial Investment',
    value: 'initial'
  },
  {
    label: 'Initial Date',
    value: 'initialDate'
  },
  {
    label: 'Target',
    value: 'target' // current price / target multiplier price
  },
  {
    label: 'Gain',
    value: 'gain'
  },
  {
    label: 'Multiplier',
    value: 'multiplier' // current multi / target multi
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
  onTakeProfit: (coin: PortfolioTableCoin) => void;
};
export const getCoinActionContent = (
  coin: PortfolioTableCoin,
  { onRemoveCoin, onEditCoin, onTakeProfit }: CoinActions,
  isInProfit: boolean
) => {
  return (
    <>
      <Box>
        {isInProfit ? (
          <IconButton
            color="success"
            aria-label="take coin's profit"
            onClick={() => onTakeProfit(coin)}>
            <PriceCheck />
          </IconButton>
        ) : null}
        <IconButton
            color="primary"
            aria-label="edit coin"
            onClick={() => onEditCoin(coin)}>
          <Edit />
        </IconButton>
        <IconButton
          color="error"
          aria-label="remove coin"
          onClick={() => onRemoveCoin(coin)}>
          <Close />
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
      getCoinActionContent(coin, actions, Boolean(coin?.inProfit))
    ) : (
      <>{coin[key]}</>
    );
  return <TableCell key={key + index} align="left" children={item} />;
};
