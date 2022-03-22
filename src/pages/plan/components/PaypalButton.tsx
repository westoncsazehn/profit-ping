// 3rd party
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { OnApproveData } from '@paypal/paypal-js/types/components/buttons';
import React, { useEffect } from 'react';
// local
import { PaypalStateType } from '../../../store';

export const PaypalButton = ({
  paypal: { 'client-id': clientID, intent, locale, vault, currency, planID },
  onPaypalApprove,
  onPaypalCancel,
  onPaypalError
}: {
  paypal: PaypalStateType;
  onPaypalApprove: any;
  onPaypalCancel: any;
  onPaypalError: any;
}) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  // when client-id updates, then update config for PayPal buttons
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        'client-id': clientID,
        intent,
        locale,
        vault,
        currency
      }
    });
  }, [clientID]);

  return (
    <PayPalButtons
      // @ts-ignore
      createSubscription={(data: any, actions: any) =>
        actions.subscription.create({
          plan_id: planID
        })
      }
      onApprove={(data: OnApproveData) => onPaypalApprove(data)}
      onCancel={onPaypalCancel}
      onError={(err: Record<string, unknown>) => onPaypalError(err)}
      style={{
        label: 'subscribe'
      }}
    />
  );
};
