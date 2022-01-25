export type GeckoCoinHistoryItem = {
  data: { id: string; market_data: { current_price: { usd: string } } };
};
export type GeckoCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};
export type FirestoreAddCoin = {
  coin: string;
  initialDate: Date;
  initialInvestment: number;
  targetMultiplier: number;
}
export type FirestoreCoin = FirestoreAddCoin & {
  initialPricePerCoin: number;
};
export type CoinProgress = Partial<GeckoCoin & FirestoreCoin> & {
  historyPriceInUSD: number;
  currentPriceInUSD: number;
  multiplier: number;
  gain?: number;
};
export type PortfolioTableCoins = {
  id: string;
  name: string;
  image: string;
  initial: string;
  target: string; // current price / target multi price
  multiplier: string; // current multi / target multi
  gain: string; // current price - history price
  symbol: string;
  initialDate: string;
};
