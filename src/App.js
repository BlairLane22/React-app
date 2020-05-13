import React, { useEffect, useState } from 'react';
import './App.css';
import ExchangeCurrency from './ExchangeCurrency';
import Form from './Form';

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    (async () =>{
    const res = await fetch(BASE_URL);
    const data = await  res.json();
    const firstCurrency = Object.keys(data.rates)[0];
    setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
    setFromCurrency(data.base);
    setToCurrency(firstCurrency);
    setExchangeRate(data.rates[firstCurrency]);
    })();
  }, [])

  useEffect(() => {
    (async () =>{
    if (fromCurrency != null && toCurrency != null) {
      const res = await fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
      const data = await res.json();
      setExchangeRate(data.rates[toCurrency]);
    }
    })();
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
    <head>Blair Lane</head>
      <h1 id="title">Blair Lane's Currency Convertion App</h1>
        <div className="body">
          <ExchangeCurrency
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <div className="equals">=</div>
          <ExchangeCurrency
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
      />
        </div>
        <Form/>
    </>
  );
}

export default App;
