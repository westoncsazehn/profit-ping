export type PaypalStateType = {
  'client-id': string;
  intent: string;
  locale: string;
  vault: boolean;
  currency: string;
  createSubscription: (data: any, action: any) => void;
  isDeferred: boolean;
  planID: string;
};
