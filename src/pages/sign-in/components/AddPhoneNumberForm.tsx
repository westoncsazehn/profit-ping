// 3rd party
import React, { createRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  styled,
  InputAdornment,
  Typography,
  IconButton,
  Stack,
  Button
} from '@mui/material';
import { Edit, PhoneAndroid } from '@mui/icons-material';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
// local
import { Recaptcha } from './recaptcha';
import { RecaptchaVerifierType } from '../../../store';

const phoneNumberError = 'A valid phone number is required';
const validatePhoneNumber = (value: number | undefined) =>
  isMobilePhone(String(value), ['en-US']);
const AddPhoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .test(phoneNumberError, phoneNumberError, validatePhoneNumber)
    .required(phoneNumberError)
});
export type AddPhoneNumberFormProps = {
  phoneNumber: number | null;
  onSubmitPhoneNumber: (phoneNumber: number, confirmationResult: any) => void;
  onCancelPhoneNumber: () => void;
  onPhoneEdit: () => void;
  isDisabled?: boolean;
  recaptchaVerifier: RecaptchaVerifierType;
  setCaptchaIdByRender: any;
  setRecaptchaVerifier: any;
};
export const StyledPhoneActionButtons = styled(Button)(({ theme }) => ({
  height: '2.5rem',
  width: '100px',
  float: 'right'
}));
export const StyledActionButtonsStack = styled(Stack)(({ theme }) => ({
  'button:last-child': { marginRight: '10px' },
  padding: '25px 0 0 0 ',
  [theme.breakpoints.up('md')]: {
    transform: 'translateY(75%)',
    padding: 'unset',
    paddingLeft: '50px'
  }
}));

export const AddPhoneNumberForm = ({
  phoneNumber,
  onSubmitPhoneNumber,
  onCancelPhoneNumber,
  onPhoneEdit,
  isDisabled,
  recaptchaVerifier,
  setCaptchaIdByRender,
  setRecaptchaVerifier
}: AddPhoneNumberFormProps) => {
  const formRef = createRef<any>();
  const resetPhoneNumberForm = () => formRef.current.reset();

  return (
    <>
      {!isDisabled ? (
        <Recaptcha
          setRecaptchaVerifier={setRecaptchaVerifier}
          recaptchaVerifier={recaptchaVerifier}
          setCaptchaIdByRender={setCaptchaIdByRender}
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
            <form onSubmit={handleSubmit} ref={formRef}>
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
                        name="phoneNumber"
                        id="phoneNumber"
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
                </Grid>
                <Grid>
                  {!isDisabled ? (
                    <StyledActionButtonsStack direction="row" spacing={1}>
                      <StyledPhoneActionButtons
                        variant="contained"
                        color="inherit"
                        type="button"
                        onClick={() => {
                          resetPhoneNumberForm();
                          onCancelPhoneNumber();
                        }}>
                        Cancel
                      </StyledPhoneActionButtons>
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
                <Typography color="error" component="p">
                  {errors.phoneNumber}
                </Typography>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
