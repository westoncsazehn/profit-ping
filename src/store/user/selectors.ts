import { AppState } from '../AppState';

export const getUser = ({ user }: AppState) => user;
export const isSubscribed = ({ user }: AppState) => Boolean(user?.isSubscribed);