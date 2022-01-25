import axios, { AxiosResponse } from "axios";
import { GeckoCoin } from "../types";

const gecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 10000,
  headers: { accept: "application/json" },
});

export const getCryptoList = (
  coins?: string
): Promise<AxiosResponse<GeckoCoin[]>> => {
  const params: URLSearchParams = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "100",
    page: "1",
    sparkline: "false",
  });
  if (coins) {
    params.append("ids", coins);
  }
  return gecko.get(`coins/markets?${params.toString()}`);
};
// TODO: add throw error logic with display alert functionality
export const getCryptoHistory = (
  crypto: string,
  date: string
): Promise<AxiosResponse<any>> => {
  const params: URLSearchParams = new URLSearchParams({
    date,
  });
  return gecko.get(`coins/${crypto}/history?${params.toString()}`);
};
