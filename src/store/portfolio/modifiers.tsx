import {
  BasePortfolioCoin,
  GeckoCoinHistoryItem,
  FirestoreCoin,
  PortfolioCoinsResponse
} from '../types';

const getHistoryPrice = (
  id: string,
  cryptoHistoryItem: GeckoCoinHistoryItem[]
): number => {
  const historyItem: GeckoCoinHistoryItem | undefined = cryptoHistoryItem.find(
    ({ data }: GeckoCoinHistoryItem) => data.id === id
  );
  if (!historyItem) {
    throw new Error(`crypto: ${id} history not found from api`);
  }
  return Number(historyItem?.data?.market_data?.current_price?.usd);
};
const getCurrentGeckoCrypto = (
  id: string,
  cryptoCurrentItem: BasePortfolioCoin[]
): BasePortfolioCoin => {
  const currentItem: BasePortfolioCoin | undefined = cryptoCurrentItem.find(
    (geckoCoin: BasePortfolioCoin) => geckoCoin.id === id
  );
  if (!currentItem) {
    throw new Error(`crypto: ${id} not found from api`);
  }
  return currentItem;
};
export const getFormattedUserCoinsList = (
  userCoinList: FirestoreCoin[],
  geckoCurrentList: BasePortfolioCoin[],
  geckoHistoryList: GeckoCoinHistoryItem[]
): PortfolioCoinsResponse[] => {
  const userCoinPortfolio: PortfolioCoinsResponse[] = [];
  userCoinList.forEach((coin: FirestoreCoin) => {
    const { initialDate, initialInvestment, targetMultiplier } = coin;
    const historyPrice = getHistoryPrice(coin?.coin, geckoHistoryList);
    const currentIem = getCurrentGeckoCrypto(coin?.coin, geckoCurrentList);
    const { name, id, symbol, image, current_price } = currentIem;
    userCoinPortfolio.push({
      id,
      name,
      image,
      symbol: symbol.toUpperCase(),
      initialInvestment,
      historyPrice,
      currentPrice: Number(current_price),
      initialDate,
      targetMultiplier
    });
  });
  return userCoinPortfolio;
};
