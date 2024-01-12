import { useState } from "react";
import { InputBox } from "./components";
import { useFetchCurrencyData } from "./hooks/useCurrencyConverter";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromAmt, setFromAmt] = useState("usd");
  const [toAmt, setToAmt] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);

  const currencyData = useFetchCurrencyData(fromAmt);

  const options = Object.keys(currencyData);

  const swatCurrencyValue = () => {
    setFromAmt(toAmt);
    setToAmt(fromAmt);
    setAmount(convertedAmt);
    setConvertedAmt(amount);
  };

  const convert = () => {
    return setConvertedAmt(amount * currencyData[toAmt]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    convert();
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={submitHandler}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={fromAmt}
                onAmountChange={amount => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swatCurrencyValue}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmt}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToAmt(currency)}
                selectCurrency={toAmt}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromAmt.toUpperCase()} to {toAmt.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
