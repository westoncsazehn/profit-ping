import { ADD_COIN_URL, SIGN_IN_URL, SETTINGS_URL, PORTFOLIO_URL, FAQ_URL } from "../common";

export const getPageTitle = (pathname: string = '', isLoggedIn: boolean): string => {
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
        case FAQ_URL:
            currenPath = 'FAQ';
            break;
        default:
            currenPath = isLoggedIn ? 'PORTFOLIO' : '';
            break;
    }
    return currenPath;
};