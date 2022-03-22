// 3rd party
import { Alert, Box, Container, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import { connect } from 'react-redux';
// local
import { DeleteItemConfirmModal, MIN_BOX_PAGE, StyledPaper } from '../common';
import {
  getSubscriptionDetails,
  deleteUser,
  AppState,
  FBUser,
  SubscriptionDetailsType
} from '../../store';
import { SubscriptionDetails } from './components';

const mapStateToProps = ({ user, subscription }: AppState) => ({
  user,
  subscription
});
const mapDispatchToProps = (dispatch: any) => ({
  deleteUser: (uid: string) => dispatch(deleteUser(uid)),
  getSubscriptionDetails: () => dispatch(getSubscriptionDetails())
});
const SettingsPage = ({
  user: { uid, isSubscribed },
  subscription,
  deleteUser,
  getSubscriptionDetails
}: {
  user: FBUser;
  subscription: SubscriptionDetailsType;
  deleteUser: any;
  getSubscriptionDetails: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // handlers
  const onModalSubmit = () => {
    setIsModalOpen(false);
    deleteUser(uid);
  };
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  // if user is subscribed, get subscription details
  useEffect(() => getSubscriptionDetails(), [isSubscribed]);
  // page text
  const description = (
    <>
      <span>Are you sure you wish to remove your account? </span>
      <br />
      <span>This will remove all data and messaging features.</span>
    </>
  );

  return (
    <>
      <Container sx={{ p: 0 }}>
        <Box component={StyledPaper} sx={{ ...MIN_BOX_PAGE, marginTop: 2 }}>
          {subscription ? (
            <SubscriptionDetails subscriptionDetails={subscription} />
          ) : null}
          <Alert
            severity="error"
            sx={{
              '.MuiAlert-icon': { p: 0, m: 'auto 0', height: 'fit-content' }
            }}>
            <Button
              color="inherit"
              sx={{ m: 1 }}
              onClick={() => setIsModalOpen(true)}>
              <Delete />
              <Typography>Delete Profile</Typography>
            </Button>
          </Alert>
        </Box>
      </Container>
      <DeleteItemConfirmModal
        closeModal={onModalClose}
        submit={onModalSubmit}
        open={isModalOpen}
        title="Account Removal"
        description={description}
      />
    </>
  );
};
const SettingsPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
export default SettingsPageRx;
