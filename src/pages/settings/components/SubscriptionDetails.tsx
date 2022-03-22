// 3rd party
import React from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
// local
import { SubscriptionDetailsType } from '../../../store';

const DetailItem = ({ title, value }: { title: string; value: string }) => (
  <Stack direction="row">
    <Typography color="inherit" sx={{ fontWeight: 'bold !important' }}>
      {title}:
    </Typography>
    <Typography color="inherit" sx={{ paddingLeft: '5px' }}>
      {value}
    </Typography>
  </Stack>
);

export const SubscriptionDetails = ({
  subscriptionDetails: {
    activationDate = '',
    orderID = '',
    phoneNumber = '',
    subscriptionID = ''
  }
}: {
  subscriptionDetails: SubscriptionDetailsType;
}) => (
  <>
    <Typography color="inherit" variant="h6">
      Subscription Details:
    </Typography>
    <Card variant="outlined" sx={{ p: 2, marginBottom: '25px' }}>
      <List dense>
        <ListItem>
          <ListItemText
            primary={
              <DetailItem title="Activation Date" value={activationDate} />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <DetailItem title="Subscribed Phone Number" value={phoneNumber} />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <DetailItem title="Subscription ID" value={subscriptionID} />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<DetailItem title="Order ID" value={orderID} />}
          />
        </ListItem>
      </List>
    </Card>
  </>
);
