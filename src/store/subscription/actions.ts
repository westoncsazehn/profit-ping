import { SubscriptionDetailsType } from '../types';

export const subscriptionActionTypes = {
  GET_SUBSCRIPTION_DETAILS: 'GET_SUBSCRIPTION_DETAILS',
  GET_SUBSCRIPTION_DETAILS_SUCCESS: 'GET_SUBSCRIPTION_DETAILS_SUCCESS',
  RESET_SUBSCRIPTION_DETAILS: 'RESET_SUBSCRIPTION_DETAILS'
};

export const getSubscriptionDetails = () => ({
  type: subscriptionActionTypes.GET_SUBSCRIPTION_DETAILS
});
export const getSubscriptionDetailsSuccess = (
  subscriptionDetails: SubscriptionDetailsType
) => ({
  type: subscriptionActionTypes.GET_SUBSCRIPTION_DETAILS_SUCCESS,
  payload: subscriptionDetails
});
export const resetDetails = () => ({
  type: subscriptionActionTypes.RESET_SUBSCRIPTION_DETAILS
});
