import { addDays, getDate, getMonth, getYear, isBefore, isExists } from "date-fns";
import * as yup from "yup";

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
export const AddCoinSchema = yup.object().shape({
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