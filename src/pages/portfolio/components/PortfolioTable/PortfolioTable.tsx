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
import {
  HeaderItem,
  SortByType,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_KEY,
  PortfolioTableCoin
} from '../../../../store';
import {
  getTableCellContent,
  getTableHeaderTitle,
  headerItems,
  rowKeys
} from './util';
import { ADD_COIN_URL, MIN_BOX_PAGE } from "../../../common";

const StyledCaption = styled('caption')(() => ({ padding: '0' }));
export const PortfolioTable = ({
  coins = [],
  onRemoveCoin,
  onEditCoin,
  onSortBy,
  sortBy = { sortKey: DEFAULT_SORT_KEY, direction: DEFAULT_SORT_DIRECTION }
}: {
  coins: PortfolioTableCoin[];
  onRemoveCoin: any;
  onEditCoin: any;
  onSortBy: (sortBy: SortByType) => void;
  sortBy: SortByType;
}) => {
  const navigate = useNavigate();
  const { sortKey, direction = 'desc' } = sortBy;
  // handlers
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
  // ui elements
  const headers = headerItems?.map((header: HeaderItem) => (
    <TableCell key={JSON.stringify(header)}>
      {header?.sortKey ? (
        <TableSortLabel
          active={sortKey === header.sortKey}
          hideSortIcon={!header?.sortKey}
          // @ts-ignore
          direction={direction as SortDirection}
          onClick={() => onSortHandler(header)}>
          {getTableHeaderTitle(header)}
        </TableSortLabel>
      ) : (
        getTableHeaderTitle(header)
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
    <TableContainer component={Paper} sx={MIN_BOX_PAGE}>
      <Table>
        <TableHead>
          <TableRow>{headers}</TableRow>
        </TableHead>
        <TableBody>{body}</TableBody>
        <StyledCaption>
          <CardHeader
            sx={{ p: 0 }}
            avatar={
              <IconButton
                color="default"
                onClick={() => navigate(`/${ADD_COIN_URL}`)}>
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
