// local
import { paypalActionTypes } from './actions';

const initialPaypalConfigState = {
  intent: 'subscription',
  locale: 'en_US',
  vault: true,
  currency: 'USD',
  isDeferred: true
};

export const paypalReducer = (
  state = initialPaypalConfigState,
  {
    type,
    payload
  }: {
    type: keyof typeof paypalActionTypes;
    payload: { clientID?: string; planID?: string; isDeferred?: boolean };
  }
) => {
  switch (type) {
    case paypalActionTypes.GET_PAYPAL_CONFIG_SUCCESS:
      return {
        ...state,
        'client-id': payload.clientID,
        planID: payload.planID
      };
    case paypalActionTypes.SET_IS_DEFERRED:
      return { ...state, isDeferred: Boolean(payload?.isDeferred) };
    default:
      return { ...state };
  }
};
