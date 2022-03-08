import { AppState } from '../AppState';

export const getNavigatePath = ({ navigate: { path } }: AppState) => path;
