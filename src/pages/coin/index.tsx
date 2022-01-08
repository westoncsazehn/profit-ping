// 3rd party libraries
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { addDays, format } from "date-fns";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
// local
import {
  db,
  Coin,
  COIN_DB,
  FBUser,
  UserContext,
  getCryptoList,
  CoinMetrics,
  getCryptoHistory,
  CoinProgress,
} from "../../api";
import { CryptoSelectBox } from "./components/CryptoSelectBox";

const DATE_FORMAT: string = "yyyy-MM-dd";

const AddCoinSchema = yup.object().shape({
  coin: yup.string().required("Required"),
  initialDate: yup.date().required("Required"),
  initialInvestment: yup.number().min(1).required("Required"),
  targetMultiplier: yup.number().min(1).required("Required"),
});

export const CoinPage = () => {
  const { email } = useContext<FBUser>(UserContext);
  const { id: paramCoin = "" } = useParams();
  const [coins, setCoins] = useState<Coin[]>();
  const [crypto, setCrypto] = useState<CoinProgress>();

  // no coin param
  useEffect(() => {
    if (!paramCoin) {
      getCryptoList().then((list: AxiosResponse<Coin[]>) =>
        setCoins(list.data)
      );
    }
  }, []);

  // coin param
  useEffect(() => {
    if (paramCoin) {
      const coinDbRef = collection(db, COIN_DB);
      const coinsQuery = query(
        coinDbRef,
        where("user", "==", email),
        where("coin", "==", paramCoin)
      );
      let userCoinMetrics: any[] = [];
      // validate user has paramCoin
      getDocs(coinsQuery).then((docs) => {
        docs.forEach((doc: any) => userCoinMetrics.push(doc.data()));
        const { coin, initialInvestment, targetMultiplier } =
          userCoinMetrics[0];
        const initialDate: Date = userCoinMetrics[0]?.initialDate.toDate();
        const formattedCryptoHistoryDate: string = format(
          initialDate,
          "dd-MM-yyyy"
        );
        Promise.all([
          getCryptoList(coin),
          getCryptoHistory(coin, formattedCryptoHistoryDate),
        ]).then((cryptoData: any) => {
          const [current, history] = cryptoData;
          const { name, id, symbol, image, current_price } = current?.data[0];
          const {
            market_data: {
              current_price: { usd: historyPrice },
            },
          } = history?.data;
          const currenPriceUSD = current_price * initialInvestment;
          const historyPriceUSD = historyPrice * initialInvestment;
          setCrypto({
            name,
            id,
            symbol,
            image,
            initialDate,
            initialInvestment,
            gain: currenPriceUSD - historyPriceUSD,
            multiplier: parseFloat(
              (currenPriceUSD / historyPriceUSD).toFixed(2)
            ),
            targetMultiplier,
            historyPrice,
            currenPriceUSD,
          });
        });
      });
    }
  }, []);

  const addCoin = async ({
    initialDate,
    initialInvestment,
    coin,
  }: CoinMetrics) => {
    await addDoc(collection(db, COIN_DB), {
      user: email,
      coin,
      initialDate: Timestamp.fromDate(new Date(initialDate)),
      initialInvestment,
    });
  };

  const pageActionText = paramCoin ? (
    <p>stats for coin {paramCoin}</p>
  ) : (
    <p>select a coin to track</p>
  );
  const initialDate: Date = new Date();

  return (
    <>
      <h1>Coin Page</h1>
      {pageActionText}
      {coins && !paramCoin ? (
        <>
          <Formik
            enableReinitialize={true}
            initialValues={{
              coin: coins[0].id,
              initialDate,
              initialInvestment: 0,
              targetMultiplier: 0,
            }}
            validationSchema={AddCoinSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                addCoin(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              isValid,
              initialTouched,
            }) => (
              <form onSubmit={handleSubmit}>
                <CryptoSelectBox
                  coins={coins}
                  onChange={handleChange}
                  value={values.coin}
                />
                {errors.coin && touched.coin && errors.coin}
                <br />
                <br />
                <label htmlFor="initialDate">Initial Date:</label>
                <input
                  type="date"
                  name="initialDate"
                  onChange={handleChange}
                  value={format(
                    values.initialDate === initialDate
                      ? initialDate
                      : addDays(new Date(values.initialDate), 1),
                    DATE_FORMAT
                  )}
                  max={format(new Date(), DATE_FORMAT)}
                />
                {errors.initialDate &&
                  touched.initialDate &&
                  errors.initialDate}
                <br />
                <br />
                <label htmlFor="initialInvestment">Amount of Crypto:</label>
                <input
                  type="number"
                  name="initialInvestment"
                  onChange={handleChange}
                  value={values.initialInvestment}
                />
                {errors.initialInvestment &&
                  touched.initialInvestment &&
                  errors.initialInvestment}
                <input
                  type="number"
                  name="targetMultiplier"
                  onChange={handleChange}
                  value={values.targetMultiplier}
                />
                {errors.targetMultiplier &&
                  touched.targetMultiplier &&
                  errors.targetMultiplier}
                <br />
                <br />
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !initialTouched}
                >
                  Add Coin
                </button>
              </form>
            )}
          </Formik>
        </>
      ) : (
        <div>
          <p>{JSON.stringify(crypto)}</p>
        </div>
      )}
    </>
  );
};
