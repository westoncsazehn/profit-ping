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
import { DeleteItemConfirmModal } from '../common';
import { FBUser, deleteUser, AppState } from '../../store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
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
        <Box component={StyledPaper} sx={{ marginTop: 2 }}>
          <Alert
            severity="error"
            sx={{
              '.MuiAlert-icon': { p: 0, m: 'auto 0', height: 'fit-content' }
            }}>
            <Button color="inherit" onClick={() => setIsModalOpen(true)}>
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
