import { useQuery, type UseQueryResult } from "@tanstack/react-query";

const url = "https://api.freecurrencyapi.com/v1/latest";

interface CurrencyRates {
  data: {
    [key: string]: number;
  };
}

export const useCurrencyRates = (
  apiKey: string,
  enabled: boolean
): UseQueryResult<CurrencyRates, Error> =>
  useQuery<CurrencyRates, Error, CurrencyRates, [string]>(
    ["currencyRates"],
    () => {
      const constructedUrl = `${url}?apikey=${apiKey}&currencies=USD&base_currency=GBP`;
      return fetch(constructedUrl).then((res) => res.json());
    },
    { enabled }
  );
