import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  TextField,
  Paper,
  FormLabel,
  Slider,
  Stack,
  Typography,
  styled
} from '@mui/material';
import { FirestoreAddCoin, GeckoCoin } from '../../../api';
import { DatePicker } from './DatePicker';
import { getMonth, getYear, getDay, isExists } from 'date-fns';

const coinError: string = 'A coin must be selected';
const initialDateError: string =
  'Initial date is required and must follow format `mm/dd/yyyy`.';
const initialInvestmentError: string =
  'Initial investment is required and must be greater than 0.';
const targetMultiplierError: string =
  'Multiplier value is required and must be 1.5 or greater.';
const validateDate = (value: Date | undefined): boolean => {
  if (!value) return false;
  const year: number = getYear(value);
  return isExists(year, getMonth(value), getDay(value)) && year >= 2000;
};
const AddCoinSchema = yup.object().shape({
  coin: yup.string().required(coinError),
  initialDate: yup
    .date()
    .test(initialDateError, initialDateError, validateDate)
    .typeError(initialDateError),
  initialInvestment: yup
    .number()
    .min(1, initialInvestmentError)
    .required(initialInvestmentError),
  targetMultiplier: yup
    .number()
    .min(1.5, targetMultiplierError)
    .required(targetMultiplierError)
});
const StyledFormControl = styled(FormControl)(() => ({
  paddingBottom: '3.25rem'
}));

export const AddCoinForm = ({
  coins,
  addCoin
}: {
  coins: GeckoCoin[];
  addCoin: (coin: FirestoreAddCoin) => void;
}) => {
  const initialDate: Date = new Date();
  return (
    <Container>
      <Box
        component={Paper}
        elevation={1}
        sx={{
          p: 10,
          FormLabel: {
            paddingBottom: '25px'
          }
        }}>
        <Formik
          enableReinitialize
          initialValues={{
            coin: coins[0].id,
            initialDate,
            initialInvestment: 0,
            targetMultiplier: 0
          }}
          validationSchema={AddCoinSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // addCoin(values);
              // setSubmitting(false);
            }, 400);
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
            console.log('errors', errors);
            const coinErrors = errors.coin || touched.coin;
            const initialDateErrors = errors.initialDate || touched.initialDate;
            const initialInvestmentErrors =
              errors.initialInvestment || touched.initialInvestment;
            const multiplierErrors =
              errors.targetMultiplier || touched.targetMultiplier;
            return (
              <form onSubmit={handleSubmit}>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(coinErrors)}>
                  <FormLabel>Select a coin</FormLabel>
                  <Select
                    value={values.coin}
                    onChange={handleChange}
                    inputProps={{
                      name: 'coin',
                      id: 'coin'
                    }}>
                    {coins.slice().map((coin) => (
                      <MenuItem value={coin.id} key={coin.id}>
                        <ListItemAvatar
                          sx={{ maxWidth: '57px', display: 'inline-block' }}>
                          <Avatar
                            alt={coin?.name || ''}
                            src={coin?.image || ''}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ overflow: 'auto', display: 'inline-block' }}>
                          {coin.name}
                        </ListItemText>
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color="error">{coinErrors}</Typography>
                </StyledFormControl>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(initialDateErrors)}>
                  <FormLabel>Initial date (date coin was acquired)</FormLabel>
                  <DatePicker
                    onDateChange={(value: any) =>
                      handleChange({
                        target: {
                          value: value ? new Date(value) : null,
                          name: 'initialDate'
                        }
                      })
                    }
                    value={values.initialDate}
                    name="initialDate"
                  />
                  <Typography color="error">{initialDateErrors}</Typography>
                </StyledFormControl>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(initialInvestmentErrors)}>
                  <FormLabel>Initial Amount of Coins</FormLabel>
                  <TextField
                    id="initialInvestment"
                    type="number"
                    onChange={handleChange}
                    value={values.initialInvestment}
                  />
                  <Typography color="error">
                    {initialInvestmentErrors}
                  </Typography>
                </StyledFormControl>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(multiplierErrors)}>
                  <FormLabel>Select target multiplier</FormLabel>
                  <Stack direction="row" spacing={2}>
                    <Slider
                      value={values.targetMultiplier}
                      name="targetMultiplier"
                      onChange={handleChange}
                      step={0.5}
                      min={1.5}
                      max={10}
                      marks
                    />
                    <Typography>
                      {values.targetMultiplier
                        ? values.targetMultiplier + 'x'
                        : ''}
                    </Typography>
                  </Stack>
                  <Typography color="error">{multiplierErrors}</Typography>
                </StyledFormControl>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || !isValid || !initialTouched}>
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};
