// 3rd party
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
import {
  getMonth,
  getYear,
  getDay,
  isExists,
  isBefore,
  addDays
} from 'date-fns';
// local
import { FirestoreAddCoin, BasePortfolioCoin } from '../../../store';
import { DatePicker } from './DatePicker';

const coinError: string = 'A coin must be selected';
const initialDateError: string =
  'Initial date is required and must follow format `mm/dd/yyyy`.';
const initialInvestmentError: string =
  'Initial investment is required and must be greater than 0.';
const targetMultiplierError: string =
  'Multiplier value is required and must be 1.5 or greater.';
// TODO: once gecko api call limit vs # of end-user requests,
// then limit min date based on currently selected coin's first price date
const validateDate = (value: Date | undefined): boolean => {
  if (!value) return false;
  const year: number = getYear(value);
  return (
    isExists(year, getMonth(value), getDay(value)) &&
    year >= 2000 &&
    isBefore(value, addDays(new Date(), 1))
  );
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
  coins: BasePortfolioCoin[];
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
        <Typography align="center" sx={{ margin: '-25px 0 25px 0' }}>
          Add a coin to track and set a multiplier. When the multiplier is hit,
          we will notify you.
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            coin: coins[0].id,
            initialDate,
            initialInvestment: 0,
            targetMultiplier: 1.5
          }}
          validationSchema={AddCoinSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addCoin(values);
              setSubmitting(false);
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
                  <Typography color="error" component="p">
                    {errors.coin}
                  </Typography>
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
                  <Typography color="error" component="p">
                    {errors.initialDate}
                  </Typography>
                </StyledFormControl>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(initialInvestmentErrors)}>
                  <FormLabel>Initial amount of coins</FormLabel>
                  <TextField
                    id="initialInvestment"
                    type="number"
                    onChange={handleChange}
                    autoComplete="off"
                    value={values.initialInvestment}
                  />
                  <Typography color="error" component="p">
                    {errors.initialInvestment}
                  </Typography>
                </StyledFormControl>
                <StyledFormControl
                  required
                  fullWidth
                  error={Boolean(multiplierErrors)}>
                  <FormLabel>Select target multiplier</FormLabel>
                  <Stack direction="row" spacing={2}>
                    <Typography>{values.targetMultiplier + 'x'}</Typography>
                    <Slider
                      value={values.targetMultiplier}
                      name="targetMultiplier"
                      onChange={handleChange}
                      step={0.25}
                      min={1.5}
                      max={10}
                      marks
                    />
                  </Stack>
                  <Typography color="error" component="p">
                    {errors.targetMultiplier}
                  </Typography>
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
