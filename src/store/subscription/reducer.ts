import { subscriptionActionTypes } from './actions';

const initialSubscriptionState = {
  activationDate: '',
  facilitatorAccessToken: '',
  orderID: '',
  phoneNumber: '',
  subscriptionID: ''
};

export const subscriptionReducer = (
  state = initialSubscriptionState,
  {
    type,
    payload
  }: {
    type: keyof typeof subscriptionActionTypes;
    payload: {
      activationDate: string;
      orderID: string;
      phoneNumber: string;
      subscriptionID: string;
    };
  }
) => {
  switch (type) {
    case subscriptionActionTypes.GET_SUBSCRIPTION_DETAILS_SUCCESS:
      return {
        ...payload,
        // @ts-ignore
        activationDate: String(payload?.activationDate?.toDate())
      };
    case subscriptionActionTypes.RESET_SUBSCRIPTION_DETAILS:
      return { ...state, ...initialSubscriptionState };
    default:
      return { ...state };
  }
};
