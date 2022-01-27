import {AppState} from "../AppState";

export const getCoins = ({ portfolio: {coins} }: AppState) => coins;