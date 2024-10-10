import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setCurrencies(Object.keys(response.data.rates));
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const convertCurrency = async () => {
            if (fromCurrency && toCurrency) {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                const rate = response.data.rates[toCurrency];
                setConvertedAmount((amount * rate).toFixed(2));
            }
        };

        convertCurrency();
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="converter-container">
            <h1>Currency Converter</h1>
            <div className="converter-form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <span> to </span>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
            <h2>
                Converted Amount: {convertedAmount} {toCurrency}
            </h2>
        </div>
    );
};

export default CurrencyConverter;
