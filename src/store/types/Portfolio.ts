// 3rd party
import { ReactNode } from 'react';

export type BasePortfolioCoin = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price?: number;
};
export type PortfolioBase = {
  nameSortValue: string;
  quantity: number;
  initialUSDSortValue: number;
  currentPriceInUSD: number;
  targetInUSD: number;
  currentMultiplier: number;
  targetMultiplier: number;
  multiplierSortValue: number;
  gainSortValue: number;
  initialDate: string;
  initialDateSortValue: number;
  inProfit: boolean;
  isMessageEnabled?: boolean;
  action?: ReactNode;
};
export type PortfolioCoin = BasePortfolioCoin & PortfolioBase & {
  initialUSD: number;
  target: number;
  multiplier: number;
  gain: number;
};
export type PortfolioTableCoin = BasePortfolioCoin & PortfolioBase & {
  initialUSD: string;
  target: ReactNode;
  multiplier: ReactNode;
  gain: ReactNode;
}
export type SortByType = { sortKey: string; direction: string };
export type Portfolio = {
  coins: PortfolioCoin[];
  sortBy: SortByType;
};
// used to remove & take profits for a coin
export type CoinAction = {
  id: string; // coin's id
  user: string; // user's uid
};
