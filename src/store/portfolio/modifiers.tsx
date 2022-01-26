import {
  GeckoCoin,
  GeckoCoinHistoryItem,
  FirestoreCoin,
  PortfolioTableCoins
} from '../../api';
import { format } from 'date-fns';

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
const toUSD = (value: string | number): string =>
  `$${Number(value).toFixed(2)}`;
export const getFormattedUserCoinsList = (
  userCoinList: FirestoreCoin[],
  geckoCurrentList: GeckoCoin[],
  geckoHistoryList: GeckoCoinHistoryItem[]
): PortfolioTableCoins[] => {
  const userCoinPortfolio: PortfolioTableCoins[] = [];
  userCoinList.forEach((coin: FirestoreCoin) => {
    const { initialDate, initialInvestment, targetMultiplier } = coin;
    const historyPrice = getHistoryPrice(coin?.coin, geckoHistoryList);
    const currentIem = getCurrentGeckoCrypto(coin?.coin, geckoCurrentList);
    const { name, id, symbol, image, current_price } = currentIem;
    const currentPriceInUSD: number = current_price * initialInvestment;
    const historyPriceInUSD: number = Number(
      (historyPrice * initialInvestment).toFixed(2)
    );
    const initialDateString: string = format(
      // @ts-ignore
      initialDate.toDate(),
      'MM-dd-yyyy'
    );
    const target: string = `${toUSD(currentPriceInUSD)} / ${toUSD(
      targetMultiplier * historyPriceInUSD
    )}`;
    const multiplier: string = `${(
      currentPriceInUSD / historyPriceInUSD
    ).toFixed(1)}x / ${targetMultiplier}x`;
    const gain: string = `${toUSD(currentPriceInUSD - historyPriceInUSD)}`;
    userCoinPortfolio.push({
      id,
      name,
      image,
      quantity: initialInvestment,
      initial: toUSD(historyPriceInUSD),
      initialDate: initialDateString,
      target,
      multiplier,
      gain,
      symbol: symbol.toUpperCase()
    });
  });
  return userCoinPortfolio;
};
