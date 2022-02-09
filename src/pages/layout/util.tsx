import {ADD_COIN_URL, LOGIN_URL, SETTINGS_URL} from "../common";

export const getPageTitle = (pathname: string = '', isLoggedIn: boolean): string => {
    let currenPath: string = '';
    const path: string = pathname.replace(/\//g, '');
    switch (path) {
        case LOGIN_URL:
            currenPath = 'LOGIN';
            break;
        case ADD_COIN_URL:
            currenPath = 'ADD COIN';
            break;
        case SETTINGS_URL:
            currenPath = 'SETTINGS';
            break;
        default:
            currenPath = isLoggedIn ? 'PORTFOLIO' : 'SIGN IN';
            break;
    }
    return currenPath;
};