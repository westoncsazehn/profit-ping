// 3rd party
import { OnApproveData } from '@paypal/paypal-js/types/components/buttons';

export const paypalActionTypes = {
  GET_PAYPAL_CONFIG: 'GET_PAYPAL_CONFIG',
  GET_PAYPAL_CONFIG_SUCCESS: 'GET_PAYPAL_CONFIG_SUCCESS',
  SET_IS_DEFERRED: 'SET_IS_DEFERRED',
  ON_PAYPAL_APPROVE: 'ON_PAYPAL_APPROVE',
  ON_PAYPAL_SUBSCRIPTION_CREATE: 'ON_PAYPAL_SUBSCRIPTION_CREATE',
  ON_PAYPAL_CANCEL: 'ON_PAYPAL_CANCEL',
  ON_PAYPAL_ERROR: 'ON_PAYPAL_ERROR',
  RESET_PAYPAL: 'RESET_PAYPAL'
};

export const getPaypalConfig = () => ({
  type: paypalActionTypes.GET_PAYPAL_CONFIG
});
export const setPaypalIsDeferred = (isDeferred: boolean) => ({
  type: paypalActionTypes.SET_IS_DEFERRED,
  payload: isDeferred
});
export const setPaypalConfig = (payload: {
  clientID: string;
  planID: string;
}) => ({
  type: paypalActionTypes.GET_PAYPAL_CONFIG_SUCCESS,
  payload
});
export const onPaypalApprove = (payload: OnApproveData) => ({
  type: paypalActionTypes.ON_PAYPAL_APPROVE,
  payload
});
export const onPaypalCancel = () => ({
  type: paypalActionTypes.ON_PAYPAL_CANCEL
});
export const onPaypalError = (payload: Record<string, unknown>) => ({
  type: paypalActionTypes.ON_PAYPAL_ERROR,
  payload
});

export const resetPaypal = () => ({
  type: paypalActionTypes.RESET_PAYPAL
});
