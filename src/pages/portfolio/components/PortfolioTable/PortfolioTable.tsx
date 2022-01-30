// 3rd party
import React from 'react';
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
  TableRow
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
// local
import { HeaderItem, PortfolioTableCoin } from '../../../../store';
import { getTableCellContent, headerItems, rowKeys } from './util';

const StyledCaption = styled('caption')(() => ({ padding: '0' }));

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
  const headers = headerItems?.map((header: HeaderItem) => (
    <TableCell key={JSON.stringify(header)}>{header.label}</TableCell>
  ));
  const body = coins?.map((coin: PortfolioTableCoin, index: number) => (
    <TableRow key={index}>
      {rowKeys
        .slice()
        .map((key: string, rowIndex: number) =>
          getTableCellContent(coin, key as keyof PortfolioTableCoin, rowIndex, {
            onRemoveCoin,
            onEditCoin,
            onTakeProfit
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
