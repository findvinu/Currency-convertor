import { useState, useEffect } from "react";

export const useFetchCurrencyData = (currency) => {
  const [currencyData, setCurrenctyData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((resData) => setCurrenctyData(resData[currency]));
  }, [currency]);
  return currencyData;
};
