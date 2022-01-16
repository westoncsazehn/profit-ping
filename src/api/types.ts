
export type CoinProgress = Partial<Coin & CoinMetrics>;
export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price?: number;
};
export type CoinMetrics = {
  coin: string;
  initialDate: Date;
  initialInvestment: number;
  targetMultiplier: number;
  multiplier?: number;
  gain?: number;
  historyPrice?: number;
  currenPriceUSD?: number;
};