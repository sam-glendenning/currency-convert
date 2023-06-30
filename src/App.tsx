import React from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import { type CurrencyRates, useCurrencyRates } from "./requests";

const App = (): React.ReactElement => {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [currencyRates, setCurrencyRates] = React.useState<
    CurrencyRates["data"] | undefined
  >(undefined);
  const [convertedValue, setConvertedValue] = React.useState<number>(0);
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const { data, isLoading, isError } = useCurrencyRates(apiKey, enabled);

  const handleAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setApiKey(e.target.value);
  };

  const handleFetchCurrencyRates = (): void => {
    setEnabled(true);
  };

  const handleCurrencyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const userCurrencyValue = parseFloat(e.target.value);
    if (!isNaN(userCurrencyValue)) {
      const usdRate = currencyRates!.USD;
      setConvertedValue(userCurrencyValue * usdRate);
    } else {
      setConvertedValue(0);
    }
  };

  React.useEffect(() => {
    if (data?.data) {
      setCurrencyRates(data.data);
      setEnabled(false);
    }
  }, [data]);

  return (
    <div className="App">
      <p>Currency converter!</p>
      <br />
      <p>Enter your API key</p>
      <TextField onChange={handleAPIKeyChange} />
      <Button onClick={handleFetchCurrencyRates}>Fetch currency rates</Button>

      {currencyRates && (
        <div>
          <p>Enter GBP to receive USD</p>
          <TextField onChange={handleCurrencyValueChange} />
          {convertedValue !== 0 ? <p>${convertedValue}</p> : <p>$0</p>}{" "}
        </div>
      )}

      <br />
      {enabled && isLoading && <p>Downloading currency rates...</p>}
      {isError && <p>Unable to fetch currency rates!</p>}
    </div>
  );
};

export default App;
