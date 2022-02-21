// 3rd party
import React from 'react';
import { Formik } from 'formik';
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Edit, PhoneAndroid } from '@mui/icons-material';
// local
import { Recaptcha } from './Recaptcha';
import { AddPhoneNumberFormProps, AddPhoneNumberSchema } from '../../../store';
import { StyledActionButtonsStack, StyledPhoneActionButtons } from './styles';

export const AddPhoneNumberForm = ({
  phoneNumber,
  onSubmitPhoneNumber,
  onPhoneEdit,
  isDisabled,
  recaptchaVerifier,
  setRecaptchaVerifier,
  setCaptchaIdByRender
}: AddPhoneNumberFormProps) => (
  <>
    <Stack sx={{ paddingBottom: '25px' }}>
      <Typography color="inherit">To Sign-In:</Typography>
      <List>
        <ListItem>
          <ListItemText primary="1. Click on edit icon to enable phone number field." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Enter phone number (digits only)." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. A message will be sent to your phone with a verification code." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Enter verification code into verification code input field." />
        </ListItem>
      </List>
    </Stack>
    {!isDisabled ? (
      <Recaptcha
        setRecaptchaVerifier={setRecaptchaVerifier}
        setCaptchaIdByRender={setCaptchaIdByRender}
        recaptchaVerifier={recaptchaVerifier}
        hasRender={!isDisabled}
      />
    ) : null}
    <Formik
      enableReinitialize
      initialValues={{ phoneNumber }}
      validationSchema={AddPhoneNumberSchema}
      onSubmit={(values, formikHelpers) => {
        if (recaptchaVerifier && values.phoneNumber) {
          onSubmitPhoneNumber(values.phoneNumber, recaptchaVerifier);
          formikHelpers.resetForm({
            values: { phoneNumber: values.phoneNumber }
          });
        }
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        initialTouched
      }) => {
        const phoneNumberErrors = errors.phoneNumber || touched.phoneNumber;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid>
                <Stack direction="row">
                  <FormControl
                    required
                    fullWidth
                    error={Boolean(phoneNumberErrors)}>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <TextField
                      disabled={isDisabled}
                      defaultValue={values.phoneNumber}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <PhoneAndroid />
                            </InputAdornment>
                          </>
                        )
                      }}
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="1234567890"
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => onPhoneEdit()}
                    disabled={!isDisabled}
                    sx={{
                      display: 'inline-block',
                      height: 40,
                      width: 40,
                      flexDirection: 'column',
                      alignSelf: 'center',
                      marginTop: '23px'
                    }}>
                    <Edit />
                  </IconButton>
                </Stack>
                <Typography color="error" component="p">
                  {errors.phoneNumber}
                </Typography>
              </Grid>
              <Grid>
                {!isDisabled ? (
                  <StyledActionButtonsStack direction="row" spacing={1}>
                    <StyledPhoneActionButtons
                      variant="contained"
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        !initialTouched ||
                        values.phoneNumber === phoneNumber
                      }>
                      Submit
                    </StyledPhoneActionButtons>
                  </StyledActionButtonsStack>
                ) : null}
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  </>
);
