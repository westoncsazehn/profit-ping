// 3rd party
import { OnApproveData } from '@paypal/paypal-js/types/components/buttons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
// local
import { MIN_BOX_PAGE, StyledPaper } from '../common';
import { PaypalButton } from './components';
import { createProduct } from '../../api';
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
  const onCreateProductPlan = () => createProduct();

  return (
    <Container>
      <Box component={StyledPaper} sx={MIN_BOX_PAGE}>
        <Typography variant="h6" component="div">
          Plus Includes:
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Add and track more coins. No limits to your portfolio!" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Select from 100 top coins." />
          </ListItem>
        </List>
        <PaypalButton
          paypal={paypal}
          onPaypalApprove={onPaypalApprove}
          onPaypalCancel={onPaypalCancel}
          onPaypalError={onPaypalError}
        />
        <Button onClick={onCreateProductPlan}>Create Product/Plan</Button>
      </Box>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(PlanPage);
