import { AppState } from '../AppState';

export const getUserUID = ({ user }: AppState) => user?.uid;
