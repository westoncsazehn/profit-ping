// TODO: investigate and simplify where used as well as definition here
export type FirestoreAddCoin = {
  coin: string;
  initialDate: Date;
  initialInvestment: number;
  targetMultiplier: number;
};
export type FirestoreCoin = FirestoreAddCoin & {
  initialPricePerCoin: number;
};
