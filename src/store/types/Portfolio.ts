import { CoinProgress } from "../../api";

export type Portfolio = {
  coins: CoinProgress[];
  userDeviceToken: string;
};
