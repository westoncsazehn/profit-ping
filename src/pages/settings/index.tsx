// 3rd party
import React, { useContext, useEffect, useState } from 'react';
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
import { AddPhoneNumberForm } from './components';
import {
  AppState,
  FBUser,
  addPhoneNumber,
  getPhoneNumber,
  deleteUser
} from '../../store';
import { UserContext } from '../../api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
const mapDispatchToProps = (dispatch: any) => ({
  getPhoneNumber: (uid: string) => dispatch(getPhoneNumber(uid)),
  addPhoneNumber: (uid: string, phoneNumber: number) =>
    dispatch(addPhoneNumber(uid, phoneNumber)),
  deleteUser: (uid: string) => dispatch(deleteUser(uid))
});
const mapStateToProps = ({ phoneNumber }: AppState) => phoneNumber;
const SettingsPage = ({
  phoneNumber,
  getPhoneNumber,
  addPhoneNumber,
  deleteUser
}: {
  phoneNumber: number;
  getPhoneNumber: any;
  addPhoneNumber: any;
  deleteUser: any;
}) => {
  const { uid } = useContext<FBUser>(UserContext);
  const hasPhoneNumber: boolean = Boolean(phoneNumber);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState<boolean>(
    phoneNumber !== 0
  );

  useEffect(() => {
    setIsPhoneInputDisabled(true);
    if (!phoneNumber) {
      getPhoneNumber(uid);
    }
  }, []);

  const onSubmitPhoneNumber = (newNumber: number) => {
    addPhoneNumber(uid, newNumber);
    setIsPhoneInputDisabled(true);
  };
  const onCancelPhoneNumberForm = () => {
    setIsPhoneInputDisabled(true);
  };
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
        <Box component={StyledPaper}>
          {!hasPhoneNumber ? (
            <Alert severity="warning" sx={{ marginBottom: '25px' }}>
              No phone number is registered. You cannot receive messages until
              one is added.
            </Alert>
          ) : null}
          <AddPhoneNumberForm
            key={String(phoneNumber)}
            phoneNumber={phoneNumber}
            onSubmitPhoneNumber={onSubmitPhoneNumber}
            onCancelPhoneNumber={onCancelPhoneNumberForm}
            isDisabled={isPhoneInputDisabled}
            setIsPhoneInputDisabled={setIsPhoneInputDisabled}
          />
        </Box>
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
