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
  Grid,
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
  getDate,
  isExists,
  isBefore,
  addDays
} from 'date-fns';
import { HelpOutline } from '@mui/icons-material';
// local
import {
  FirestoreAddCoin,
  BasePortfolioCoin,
  FirestoreCoin
} from '../../../store';
import { DatePicker } from './DatePicker';
import { StyledTooltip } from '../../portfolio/components/PortfolioTable/styles';

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
    isExists(year, getMonth(value), getDate(value)) &&
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
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    padding: '3rem'
  }
}));
const StyledFormTitleDescription = styled(Typography)(({ theme }) => ({
  margin: '15px 0',
  [theme.breakpoints.up('md')]: { marginBottom: '50px' }
}));
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  paddingBottom: '1.25rem',
  [theme.breakpoints.up('md')]: {
    paddingBottom: '3rem'
  }
}));
export const StyledHelpOutline = styled(HelpOutline)(() => ({
  fontSize: '0.75rem',
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '2px !important',
  marginTop: '3px !important'
}));
export const StyledFormButtons = styled(Button)(({ theme }) => ({
  height: '2.5rem',
  width: '100px',
  float: 'right',
  marginTop: '15px'
}));

export const AddCoinForm = ({
  coins,
  addCoin,
  selectedCoin,
  onCancel
}: {
  coins: BasePortfolioCoin[];
  addCoin: (coin: FirestoreAddCoin) => void;
  selectedCoin: FirestoreCoin;
  onCancel: () => void;
}) => {
  return coins?.length ? (
    <Container>
      <Box component={StyledPaper}>
        <StyledFormTitleDescription>
          Add a coin to track and set a multiplier. When the multiplier is hit,
          we will notify you.
        </StyledFormTitleDescription>
        {selectedCoin?.error ? (
          <Typography align="center" color="error">
            {selectedCoin?.error}
          </Typography>
        ) : null}
        <Formik
          enableReinitialize
          initialValues={selectedCoin}
          validationSchema={AddCoinSchema}
          onSubmit={(values) => addCoin(values)}>
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
                <Grid container spacing={{ md: 4 }}>
                  <Grid item xs={12} md={6}>
                    <StyledFormControl
                      required
                      fullWidth
                      error={Boolean(coinErrors)}>
                      <FormLabel>Select a coin</FormLabel>
                      <Select
                        value={values.coin}
                        onChange={handleChange}
                        disabled={Boolean(selectedCoin?.coin)}
                        inputProps={{
                          name: 'coin',
                          id: 'coin'
                        }}>
                        {coins.slice().map((coin) => (
                          <MenuItem value={coin.id} key={coin.id}>
                            <ListItemAvatar
                              sx={{
                                maxWidth: '57px',
                                display: 'inline-block'
                              }}>
                              <Avatar
                                alt={coin?.name || ''}
                                src={coin?.image || ''}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              sx={{
                                overflow: 'auto',
                                display: 'inline-block'
                              }}>
                              {coin.name}
                            </ListItemText>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography color="error" component="p">
                        {errors.coin}
                      </Typography>
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledFormControl
                      required
                      fullWidth
                      error={Boolean(initialDateErrors)}>
                      <Stack direction="row" spacing={1}>
                        <FormLabel>Initial date</FormLabel>
                        <StyledTooltip
                          title="Date of initial coin purchase"
                          placement="top"
                          arrow>
                          <StyledHelpOutline />
                        </StyledTooltip>
                      </Stack>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledFormControl
                      required
                      fullWidth
                      error={Boolean(multiplierErrors)}>
                      <Stack direction="row" spacing={1}>
                        <FormLabel>Select target multiplier</FormLabel>
                        <StyledTooltip
                          title="You will be messaged when this multiplier is reached."
                          placement="top"
                          arrow>
                          <StyledHelpOutline />
                        </StyledTooltip>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ paddingTop: '15px' }}>
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
                  </Grid>
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
                      onClick={onCancel}>
                      Cancel
                    </StyledFormButtons>
                    <StyledFormButtons
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isValid || !initialTouched}>
                      Submit
                    </StyledFormButtons>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  ) : null;
};
