// local
import { PortfolioTableCoin } from './Portfolio';

export type CoinActionsType = {
  onRemoveCoin: (coin: PortfolioTableCoin) => void;
  onEditCoin: (coin: PortfolioTableCoin) => void;
};
