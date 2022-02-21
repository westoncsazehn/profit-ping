import isMobilePhone from "validator/es/lib/isMobilePhone";
import * as yup from "yup";

const phoneNumberError = 'A valid phone number is required';
const validatePhoneNumber = (value: number | undefined) =>
  isMobilePhone(String(value), ['en-US']);
export const AddPhoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .test(phoneNumberError, phoneNumberError, validatePhoneNumber)
    .required(phoneNumberError)
});