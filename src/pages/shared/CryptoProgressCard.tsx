import React from "react";
import { ProgressBar } from "./ProgressBar";
import { CoinProgress } from "../../api";

export const CryptoProgressCard = (data: { coin: CoinProgress }) => {
  const {
    coin: {
      name = "",
      id = "",
      symbol = "",
      image = "",
      initialDate = "",
      initialInvestment = 0,
      gain = 0,
      multiplier = 0,
      targetMultiplier = 0,
    },
  } = data;
  return (
    <div>
      <img src="" alt="test" />
      <ProgressBar />
    </div>
  );
};
