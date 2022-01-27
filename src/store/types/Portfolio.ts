import { ReactNode } from 'react';

export type BasePortfolioCoin = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  current_price?: number;
};
export type PortfolioTableCoin = BasePortfolioCoin & {
  quantity: number; // amount of coins
  initial: ReactNode; // $initial amount (quantity * history price)
  target: ReactNode; // $current price / $target multi price
  multiplier: ReactNode; // current multi / target multi
  gain: ReactNode; // current price - history price
  initialDate: string;
  inProfit: boolean;
  action?: ReactNode;
};
export type PortfolioCoinsResponse = BasePortfolioCoin & {
  initialDate: Date;
  initialInvestment: number;
  targetMultiplier: number;
  historyPrice: number;
  currentPrice: number;
};
export type Portfolio = {
  coins: PortfolioCoinsResponse[];
  userDeviceToken: string;
};
// used to remove & take profits for a coin
export type CoinAction = {
  id: string; // coin's id
  user: string; // user's email
};
