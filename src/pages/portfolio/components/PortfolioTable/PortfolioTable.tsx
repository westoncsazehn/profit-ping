// 3rd party
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardHeader,
  IconButton,
  Paper,
  SortDirection,
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
import { HeaderItem, PortfolioTableCoin, SortByType } from '../../../../store';
import { getTableCellContent, headerItems, rowKeys } from './util';

const StyledCaption = styled('caption')(() => ({ padding: '0' }));
export const PortfolioTable = ({
  coins = [],
  onRemoveCoin,
  onEditCoin,
  onSortBy,
  sortBy
}: {
  coins: PortfolioTableCoin[];
  onRemoveCoin: any;
  onEditCoin: any;
  onSortBy: (sortBy: SortByType) => void;
  sortBy: SortByType;
}) => {
  const navigate = useNavigate();
  const { sortKey, direction = 'desc' } = sortBy;

  const onSortHandler = (header: HeaderItem) => {
    let newDirection: string = 'desc';
    const headerKey: string = String(header.sortKey);
    if (headerKey === sortKey) {
      newDirection = direction === 'asc' ? 'desc' : 'asc';
    }
    onSortBy({
      sortKey: headerKey,
      direction: newDirection
    });
  };
  const headers = headerItems?.map((header: HeaderItem) => (
    <TableCell key={JSON.stringify(header)}>
      {header?.sortKey ? (
        <TableSortLabel
          active={sortBy.sortKey === header.sortKey}
          // @ts-ignore
          direction={direction as SortDirection}
          onClick={() => onSortHandler(header)}>
          {header.label}
        </TableSortLabel>
      ) : (
        header.label
      )}
    </TableCell>
  ));
  const body = coins?.map((coin: PortfolioTableCoin, index: number) => (
    <TableRow key={index}>
      {rowKeys.slice().map((key: string, rowIndex: number) =>
        getTableCellContent(coin, key as keyof PortfolioTableCoin, rowIndex, {
          onRemoveCoin,
          onEditCoin
        })
      )}
    </TableRow>
  ));

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
