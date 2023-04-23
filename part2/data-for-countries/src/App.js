import React, { useState } from 'react';
import Country from './components/Country';
import countryService from './services/countryService';
import CountryInput from './components/CountryInput';
import './App.css';

const LOADING_TEXT = 'Loading ...';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCountrySearch = (countryQuery) => {
    if (!countryQuery) {
      return;
    }
    setIsLoading(true);
    countryService
      .getCountries(countryQuery)
      .then((countryData) => setCountries(countryData))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };
  const countryCount = countries.length;

  return (
    <div>
      <CountryInput handleCountrySearch={handleCountrySearch} />
      {isLoading
        ? LOADING_TEXT
        : countries.map((country) => (
            <Country
              key={country.name.common}
              country={country}
              shouldShowDetail={countryCount === 1}
            />
          ))}
    </div>
  );
};

export default App;
