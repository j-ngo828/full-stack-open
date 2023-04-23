import React, { useState } from 'react';
import './App.css';
import Country from './components/Country';
import CountryInput from './components/CountryInput';
import Notification from './components/Notification';
import countryService from './services/countryService';

const ERROR_MESSAGE = 'No countries found';
const LOADING_TEXT = 'Loading ...';
const TOO_MANY_RESULTS = 'Too many matches, specify another filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCountrySearch = (countryQuery) => {
    if (!countryQuery) {
      return;
    }
    setCountries([]);
    countryService
      .getCountries(countryQuery)
      .then((countryData) => setCountries(countryData))
      .catch((error) => {
        console.error(error);
        setErrorMessage(ERROR_MESSAGE);
      })
      .finally(() => setIsLoading(false));
  };
  const countryCount = countries.length;

  const countryQueryResult =
    countryCount > 10
      ? TOO_MANY_RESULTS
      : countries.map((country) => (
          <Country
            key={country.name.common}
            country={country}
            shouldShowDetail={countryCount === 1}
          />
        ));

  return (
    <div>
      <CountryInput
        handleCountrySearch={handleCountrySearch}
        handleUserSearch={() => setIsLoading(true)}
        handleErrorMessageClear={() => setErrorMessage(null)}
        hasErrorMessage={!errorMessage}
      />
      <Notification message={errorMessage} />
      {isLoading ? LOADING_TEXT : countryQueryResult}
    </div>
  );
};

export default App;
