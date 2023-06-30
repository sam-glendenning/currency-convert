import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";

const url = "https://api.freecurrencyapi.com/v1/latest";

export interface CurrencyRates {
  data: {
    [key: string]: number;
  };
}

export const useCurrencyRates = (
  apiKey: string,
  enabled: UseQueryOptions["enabled"]
): UseQueryResult<CurrencyRates, Error> =>
  useQuery<CurrencyRates, Error, CurrencyRates, [string]>(
    ["currencyRates"],
    () => {
      const constructedUrl = `${url}?apikey=${apiKey}&currencies=USD&base_currency=GBP`;
      return fetch(constructedUrl).then((res) => res.json());
    },
    {
      enabled,
    }
  );
