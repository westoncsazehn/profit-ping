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
  Stack
} from '@mui/material';
import { Edit, PhoneAndroid } from '@mui/icons-material';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
// local
import { StyledFormButtons } from '../../add-coin/components';

const StyledFormControl = styled(FormControl)(({ theme }) => ({}));
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
  phoneNumber: number;
  onSubmitPhoneNumber: (phoneNumber: number) => void;
  onCancelPhoneNumber: () => void;
  setIsPhoneInputDisabled: (isDisabled: boolean) => void;
  isDisabled?: boolean;
};

export const AddPhoneNumberForm = ({
  phoneNumber,
  onSubmitPhoneNumber,
  onCancelPhoneNumber,
  setIsPhoneInputDisabled,
  isDisabled
}: AddPhoneNumberFormProps) => {
  const formRef = createRef<any>();
  const resetPhoneNumberForm = () => formRef.current.reset();
  return (
    <Formik
      enableReinitialize
      initialValues={{ phoneNumber }}
      validationSchema={AddPhoneNumberSchema}
      onSubmit={(values, formikHelpers) => {
        onSubmitPhoneNumber(values.phoneNumber);
        formikHelpers.resetForm({
          values: { phoneNumber: values.phoneNumber }
        });
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
            <Grid container spacing={{ md: 4 }}>
              <Grid item xs={12} md={6}>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(phoneNumberErrors)}>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <Stack direction="row" spacing={1}>
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
                    <IconButton
                      onClick={() => setIsPhoneInputDisabled(false)}
                      sx={{
                        display: 'inline-block',
                        height: 40,
                        width: 40,
                        flexDirection: 'column',
                        alignSelf: 'center'
                      }}>
                      <Edit />
                    </IconButton>
                    <Typography color="error" component="p">
                      {errors.phoneNumber}
                    </Typography>
                  </Stack>
                </StyledFormControl>
              </Grid>
              {!isDisabled ? (
                <Grid
                  item
                  xs={12}
                  sx={{
                    'button:last-child': { marginRight: '10px' }
                  }}>
                  <StyledFormButtons
                    variant="contained"
                    color="inherit"
                    type="button"
                    onClick={() => {
                      resetPhoneNumberForm();
                      onCancelPhoneNumber();
                    }}>
                    Cancel
                  </StyledFormButtons>
                  <StyledFormButtons
                    variant="contained"
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !isValid ||
                      !initialTouched ||
                      values.phoneNumber === phoneNumber
                    }>
                    Submit
                  </StyledFormButtons>
                </Grid>
              ) : null}
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};
