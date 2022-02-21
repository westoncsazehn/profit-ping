import { RecaptchaVerifierType } from "./RecaptchaStateType";

export type AddPhoneNumberFormProps = {
  phoneNumber: number | null;
  onSubmitPhoneNumber: (phoneNumber: number, confirmationResult: any) => void;
  onCancelPhoneNumber: () => void;
  onPhoneEdit: () => void;
  isDisabled?: boolean;
  recaptchaVerifier: RecaptchaVerifierType;
  setRecaptchaVerifier: any;
  setCaptchaIdByRender: any;
};