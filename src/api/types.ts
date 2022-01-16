export type CoinProgress = Partial<GeckoCoin & FirestoreCoin> & {
  historyPriceInUSD: number;
  currentPriceInUSD: number;
  multiplier: number;
  gain?: number;
};
export type GeckoCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};
export type GeckoCoinHistoryItem = {
  data: { id: string; market_data: { current_price: { usd: string } } };
};
export type FirestoreCoin = {
  coin: string;
  initialDate: Date;
  initialInvestment: number;
  targetMultiplier: number;
};
