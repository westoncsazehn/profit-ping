import { PortfolioTableCoins } from '../../api';

export type Portfolio = {
  coins: PortfolioTableCoins[];
  userDeviceToken: string;
};
