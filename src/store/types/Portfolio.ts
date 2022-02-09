// 3rd party
import { ReactNode } from 'react';

export type BasePortfolioCoin = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price?: number;
};
export type PortfolioTableCoin = BasePortfolioCoin & {
  nameSortValue: string;
  quantity: number; // amount of coins
  initialUSD: ReactNode; // $initial amount (quantity * history price)
  initialUSDSortValue: number;
  target: ReactNode; // $current price / $target multi price
  multiplier: ReactNode; // current multi / target multi
  multiplierSortValue: number;
  gain: ReactNode; // current price - history price
  gainSortValue: number;
  initialDate: string;
  initialDateSortValue: number;
  inProfit: boolean;
  isMessageEnabled?: boolean;
  action?: ReactNode;
};
export type SortByType = { sortKey: string; direction: string };
export type Portfolio = {
  coins: PortfolioTableCoin[];
  sortBy: SortByType;
  userDeviceToken: string;
};
// used to remove & take profits for a coin
export type CoinAction = {
  id: string; // coin's id
  user: string; // user's uid
};
