// 3rd party libraries
import React from "react";
import { Field } from "formik";
// local
import { Coin } from "../../../api";

export const CryptoSelectBox = (props: {
  coins: Coin[];
  onChange: (e: any) => void;
  value?: string;
}) => {
  const { coins, onChange, value } = props;
  return coins ? (
    <>
      <label htmlFor="coin">Crypto:</label>
      <Field
        as="select"
        name="coin"
        id="coin"
        onChange={onChange}
        value={value}
        title="test"
      >
        {coins.map((coin) => (
          <option value={coin.id} key={JSON.stringify(coin)}>
            {coin.name}
          </option>
        ))}
      </Field>
    </>
  ) : null;
};
