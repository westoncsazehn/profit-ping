// 3rd party
import React, { ReactNode } from 'react';
import {
  Avatar,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
// local
import { PortfolioTableCoins } from '../../../api';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type HeaderItem = {
  label: string;
  value: string | ReactNode;
  action?: ReactNode;
};
const headerItems: HeaderItem[] = [
  {
    label: 'Coin',
    value: 'name'
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
    label: 'Multiplier',
    value: 'multiplier' // current multi / target multi
  },
  {
    label: 'Gain',
    value: 'gain'
  },
  { label: '', value: '' }
];
const rowKeys: string[] = headerItems
  .slice()
  .map((item) => item.value as string);

export const PortfolioTable = (props: { coins: PortfolioTableCoins[] }) => {
  const { coins = [] } = props;
  const navigate = useNavigate();
  const headers = headerItems?.map((header: HeaderItem) => (
    <TableCell key={JSON.stringify(header)}>{header.label}</TableCell>
  ));
  const body = coins?.map((coin: PortfolioTableCoins, index: number) => (
    <TableRow key={index}>
      {rowKeys.slice().map((key: string, rowIndex: number) => {
        const item =
          key === 'name' ? (
            <CardHeader
              sx={{ p: 0 }}
              avatar={<Avatar alt={coin.name} src={coin.image} />}
              title={coin.symbol}
            />
          ) : (
            <>{coin[key as keyof PortfolioTableCoins]}</>
          );
        return <TableCell key={key + rowIndex} align="left" children={item} />;
      })}
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>
          {body}
          <TableRow key="addCoinKey">
            <TableCell>
              <CardHeader
                sx={{ p: 0 }}
                avatar={
                  <IconButton color="primary" onClick={() => navigate('/coin')}>
                    <Add fontSize="small" />
                  </IconButton>
                }
                title="ADD COIN"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
