import {
  CoinProgress,
  GeckoCoin,
  GeckoCoinHistoryItem,
  FirestoreCoin
} from '../../api';

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
  cryptoCurrentItem: GeckoCoin[]
): GeckoCoin => {
  const currentItem: GeckoCoin | undefined = cryptoCurrentItem.find(
    (geckoCoin: GeckoCoin) => geckoCoin.id === id
  );
  if (!currentItem) {
    throw new Error(`crypto: ${id} not found from api`);
  }
  return currentItem;
};
export const getFormattedUserCoinsList = (
  userCoinList: FirestoreCoin[],
  geckoCurrentList: GeckoCoin[],
  geckoHistoryList: GeckoCoinHistoryItem[]
): CoinProgress[] => {
  const userCoinPortfolio: CoinProgress[] = [];
  userCoinList.forEach((coin: FirestoreCoin) => {
    const { initialDate, initialInvestment, targetMultiplier } = coin;
    const historyPrice = getHistoryPrice(coin?.coin, geckoHistoryList);
    const currentIem = getCurrentGeckoCrypto(coin?.coin, geckoCurrentList);
    const { name, id, symbol, image, current_price } = currentIem;
    const currentPriceInUSD: number = current_price * initialInvestment;
    const historyPriceInUSD: number = Number(
      (historyPrice * initialInvestment).toFixed(2)
    );
    userCoinPortfolio.push({
      name,
      id,
      symbol,
      image,
      // @ts-ignore
      initialDate: initialDate.toDate(),
      initialInvestment,
      targetMultiplier: Number(targetMultiplier),
      historyPriceInUSD,
      currentPriceInUSD,
      gain: Number((currentPriceInUSD - historyPriceInUSD).toFixed(2)),
      multiplier: Number((currentPriceInUSD / historyPriceInUSD).toFixed(2))
    });
  });
  return userCoinPortfolio;
};
