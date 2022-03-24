import {
  ADD_COIN_URL,
  SIGN_IN_URL,
  SETTINGS_URL,
  PORTFOLIO_URL,
  PLAN_URL,
  FAQ_URL, PRIVACY_POLICY_URL
} from "../common";

export const getPageTitle = (
  pathname: string = '',
  isLoggedIn: boolean
): string => {
  let currenPath: string = '';
  const path: string = pathname.replace(/\//g, '');
  switch (path) {
    case SIGN_IN_URL:
      currenPath = 'SIGN IN';
      break;
    case ADD_COIN_URL:
      currenPath = 'ADD COIN';
      break;
    case SETTINGS_URL:
      currenPath = 'SETTINGS';
      break;
    case PORTFOLIO_URL:
      currenPath = 'PORTFOLIO';
      break;
    case PLAN_URL:
      currenPath = 'SUBSCRIBE';
      break;
    case FAQ_URL:
      currenPath = 'FAQ';
      break;
    case PRIVACY_POLICY_URL:
      currenPath = 'PRIVACY POLICY';
      break;
    default:
      currenPath = isLoggedIn ? 'PORTFOLIO' : '';
      break;
  }
  return currenPath;
};
