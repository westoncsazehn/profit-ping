// 3rd party
import { OnApproveData } from '@paypal/paypal-js/types/components/buttons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography
} from '@mui/material';
// local
import { MIN_BOX_PAGE, StyledPaper } from '../common';
import { PaypalButton, StyledPayPalContainer } from './components';
import {
  AppState,
  onPaypalApprove,
  onPaypalCancel,
  onPaypalError,
  PaypalStateType,
  setPaypalIsDeferred
} from '../../store';

const mapStateToProps = ({
  paypal
}: AppState): { paypal: PaypalStateType } => ({
  paypal
});
const mapDispatchToProps = (dispatch: any) => ({
  setPaypalIsDeferred: (isDeferred: boolean) =>
    dispatch(setPaypalIsDeferred(isDeferred)),
  onPaypalApprove: (data: OnApproveData) => dispatch(onPaypalApprove(data)),
  onPaypalCancel: () => dispatch(onPaypalCancel()),
  onPaypalError: (err: Record<string, unknown>) => dispatch(onPaypalError(err))
});
const PlanPage = ({
  paypal,
  setPaypalIsDeferred,
  onPaypalApprove,
  onPaypalCancel,
  onPaypalError
}: {
  paypal: PaypalStateType;
  setPaypalIsDeferred: any;
  onPaypalApprove: any;
  onPaypalCancel: any;
  onPaypalError: any;
}) => {
  const { 'client-id': clientID } = paypal;
  // set isDeferred to true to load PayPal scripts and button
  useEffect(() => {
    clientID && setPaypalIsDeferred(false);
  }, []);
  // handlers

  return (
    <Container>
      <Box component={StyledPaper} sx={MIN_BOX_PAGE}>
        <Typography variant="h6" sx={{ paddingBottom: '15px' }}>
          Profit Ping Plus Subscription Service
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, minHeight: '400px' }}>
              <List sx={{ p: 0 }}>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Designed for the mid to long-term
                   investor in mind."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Add and track more coins. No limits to
                   your portfolio."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Select from 100 top coins." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Take a step away from the charts and
                   let us notify you when you're in profit."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="The perfect hands-off tool to help
                   make profits."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Receive a text once your designated
                   multiplier is hit for any/all coins in your portfolio."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="A valuable tool for a low price at
                   $4.99/month."
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Cancel anytime via our Settings
                   page."
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 2, minHeight: '400px' }}>
              <Typography variant="h6" sx={{ paddingBottom: '15px' }}>
                Subscribe via Paypal:
              </Typography>
              <StyledPayPalContainer>
                <PaypalButton
                  paypal={paypal}
                  onPaypalApprove={onPaypalApprove}
                  onPaypalCancel={onPaypalCancel}
                  onPaypalError={onPaypalError}
                />
              </StyledPayPalContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanPage);
