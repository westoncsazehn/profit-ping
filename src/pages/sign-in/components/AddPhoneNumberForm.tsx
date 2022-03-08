// 3rd party
import React from 'react';
import { Formik } from 'formik';
import {
  Card,
  FormLabel,
  Grid,
  InputAdornment,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Edit, PhoneAndroid } from '@mui/icons-material';
// local
import { Recaptcha } from './Recaptcha';
import { AddPhoneNumberFormProps, AddPhoneNumberSchema } from '../../../store';
import {
  StyledEditIconButton,
  StyledPhoneActionButtons,
  StyledPhoneFormControl,
  StyledPhoneInputField
} from './styles';

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
    <Card variant="outlined" sx={{ p: 2, marginBottom: '25px' }}>
      <Typography color="inherit" sx={{ fontWeight: 'bold !important' }}>
        To Sign-In:
      </Typography>
      <List dense>
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
    </Card>
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
              <Grid item xs={12} md={3}>
                <Stack direction="row">
                  <StyledPhoneFormControl
                    required
                    fullWidth
                    error={Boolean(phoneNumberErrors)}>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <StyledPhoneInputField
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
                  </StyledPhoneFormControl>
                  <StyledEditIconButton
                    onClick={() => onPhoneEdit()}
                    disabled={!isDisabled}
                    color="primary">
                    <Edit />
                  </StyledEditIconButton>
                </Stack>
                <Typography color="error" component="p">
                  {errors.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                {!isDisabled ? (
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
                ) : null}
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  </>
);
