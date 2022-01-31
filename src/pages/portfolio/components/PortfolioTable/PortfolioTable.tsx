// 3rd party
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardHeader,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
// local
import { HeaderItem, PortfolioTableCoin } from '../../../../store';
import { getTableCellContent, headerItems, rowKeys } from './util';

const StyledCaption = styled('caption')(() => ({ padding: '0' }));
type SortByDirection = 'asc' | 'desc';
type SortByType = {
  sortKey: string;
  direction: SortByDirection;
};
type SortValueType = number | string | Date;
const DEFAULT_SORT_BY = {
  sortKey: 'multiplierSortValue',
  direction: 'desc' as SortByDirection
};
export const PortfolioTable = ({
  coins = [],
  onRemoveCoin,
  onEditCoin,
  onTakeProfit
}: {
  coins: PortfolioTableCoin[];
  onRemoveCoin: any;
  onEditCoin: any;
  onTakeProfit: any;
}) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortByType>(DEFAULT_SORT_BY);
  const [sortedCoins, setSortedCoins] = useState(coins);
  // TODO: implement onSort redux logic, actions, reducer, etc
  // move sort logic into a modifier
  const onSort = (header: HeaderItem) => {
    const newSortKey: string = String(header.sortKey);
    let newSortBy: SortByDirection = 'desc' as SortByDirection;
    if (newSortKey === sortBy.sortKey) {
      newSortBy = (
        sortBy.direction === 'asc' ? 'desc' : 'asc'
      ) as SortByDirection;
    }
    const newSortedCoins = coins
      .slice()
      .sort((a: PortfolioTableCoin, b: PortfolioTableCoin) => {
        const aValue: SortValueType = a[
          newSortKey as keyof PortfolioTableCoin
        ] as SortValueType;
        const bValue: SortValueType = b[
          newSortKey as keyof PortfolioTableCoin
        ] as SortValueType;
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          const difference: number = aValue - bValue;
          return newSortBy === 'desc' ? -1 * difference : difference;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const stringSortDirection: number = aValue < bValue ? 1 : -1;
          return newSortBy === 'desc'
            ? -1 * stringSortDirection
            : stringSortDirection;
        }
        return 0;
      });
    setSortedCoins(newSortedCoins);
    setSortBy({ sortKey: newSortKey, direction: newSortBy });
  };
  const headers = headerItems?.map((header: HeaderItem) => (
    <TableCell key={JSON.stringify(header)}>
      {header?.sortKey ? (
        <TableSortLabel
          active={sortBy.sortKey === header.sortKey}
          direction={sortBy.direction}
          onClick={() => onSort(header)}>
          {header.label}
        </TableSortLabel>
      ) : (
        header.label
      )}
    </TableCell>
  ));
  const body = sortedCoins?.map((coin: PortfolioTableCoin, index: number) => (
    <TableRow key={index}>
      {rowKeys.slice().map((key: string, rowIndex: number) =>
        getTableCellContent(coin, key as keyof PortfolioTableCoin, rowIndex, {
          onRemoveCoin,
          onEditCoin,
          onTakeProfit
        })
      )}
    </TableRow>
  ));

  useEffect(() => onSort({ label: '', value: '', ...DEFAULT_SORT_BY }), []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
        <StyledCaption>
          <CardHeader
            sx={{ p: 0 }}
            avatar={
              <IconButton color="default" onClick={() => navigate('/add-coin')}>
                <AddCircle fontSize="medium" />
              </IconButton>
            }
            title="ADD COIN"
          />
        </StyledCaption>
      </Table>
    </TableContainer>
  );
};
