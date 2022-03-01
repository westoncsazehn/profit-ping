// 3rd party
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Box,
  Container,
  Button,
  Paper,
  styled,
  Typography
} from '@mui/material';
import { Delete } from '@mui/icons-material';
// local
import { DeleteItemConfirmModal, MIN_BOX_PAGE, StyledPaper } from "../common";
import { FBUser, deleteUser, AppState } from '../../store';

const mapStateToProps = ({ user }: AppState) => ({ user });
const mapDispatchToProps = (dispatch: any) => ({
  deleteUser: (uid: string) => dispatch(deleteUser(uid))
});
const SettingsPage = ({
  user: { uid },
  deleteUser
}: {
  user: FBUser;
  deleteUser: any;
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
          <Alert
            severity="error"
            sx={{
              '.MuiAlert-icon': { p: 0, m: 'auto 0', height: 'fit-content' }
            }}>
            <Button color="inherit" sx={{m: 1}} onClick={() => setIsModalOpen(true)}>
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
export const SettingsPageRx = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
