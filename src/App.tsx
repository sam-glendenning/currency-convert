import React from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import { useCurrencyRates } from "./requests";

const App = (): React.ReactElement => {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [currencyValue, setCurrencyValue] = React.useState<number>(0);
  const [convertedValue, setConvertedValue] = React.useState<
    number | undefined
  >(undefined);
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const { data, isLoading } = useCurrencyRates(apiKey, enabled);

  const handleAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setApiKey(e.target.value);
  };

  const handleCurrencyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrencyValue(parseFloat(e.target.value));
  };

  const convert = (): void => {
    setEnabled(true);
  };

  React.useEffect(() => {
    if (data) {
      if (!data?.data) {
        console.log("nope");
        return;
      }
      const usdRate = data.data.USD;
      if (usdRate) {
        setConvertedValue(currencyValue * usdRate);
      }
    }
  }, [currencyValue, data]);

  return (
    <div className="App">
      <p>Currency converter!</p>
      <br />
      <p>Enter your API key</p>
      <TextField onChange={handleAPIKeyChange} />

      <p>Enter GBP to receive USD</p>
      <TextField onChange={handleCurrencyValueChange} />

      <Button onClick={() => convert()}>Convert</Button>

      {convertedValue && <p>${convertedValue}</p>}
    </div>
  );
};

export default App;
