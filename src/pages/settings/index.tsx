// 3rd party
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Container, IconButton, Typography } from '@mui/material';
// local
import { AppState } from '@store/AppState';
import { Delete } from '@mui/icons-material';
import { DeleteItemConfirmModal } from '../common';

// const mapDispatchToProps = (dispatch: any) => ({
//   ooo: (ooo: OOO) => dispatch(ooo(ooo))
// });
// const mapStateToProps = (appState: AppState) => appState;
export const SettingsPage = (props: any) => {
  console.log('props', props);
  const phoneNumber: number = 1234567890;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onDeleteAllUserData = () => {
    console.log('delete all user data');
  };
  const onSubmit = () => {
    console.log('modal submit called');
  };
  const onCloseModal = () => {
    console.log('modal close called');
    setIsModalOpen(false);
  };
  const title = (
    <>
      <Typography>Account Removal</Typography>
    </>
  );
  const description = (
    <>
      <Typography>Are you sure you wish to remove your account? </Typography>
      <Typography>This will remove all data and messaging features.</Typography>
    </>
  );
  return (
    <>
      <Container maxWidth="xl" sx={{ p: 0 }}>
        <Box>
          <Typography
            color={Boolean(phoneNumber) ? 'inherit' : 'error'}
            component="p">
            Phone Number: {phoneNumber}
          </Typography>
          <IconButton onClick={onDeleteAllUserData}>
            <Delete />
          </IconButton>
        </Box>
      </Container>
      <DeleteItemConfirmModal
        closeModal={onCloseModal}
        submit={onSubmit}
        open={isModalOpen}
        title={title}
        description={description}
      />
    </>
  );
};
export const SettingsPageRx = connect(null, null)(SettingsPage);
