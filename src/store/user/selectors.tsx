import { AppState } from '../AppState';

export const getUserEmail = ({ user }: AppState) => user?.email;
