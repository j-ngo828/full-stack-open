import React, { useEffect, useState } from 'react';
import weatherService from '../services/weatherService';

const SHOW = 'show';
const HIDE = 'hide';
const CAPITAL = 'capital';
const AREA = 'area';
const LANGUAGES = 'languages:';
const NO_CAPITAL = 'no capital';
const METER_PER_SECOND = 'm/s';
const TEMPERATURE = 'temperature';
const WIND = 'wind';
const CELSIUS = 'Celsius';
const WEATHER_HEADING = 'Weather in';

const Button = ({ text, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {text}
  </button>
);

const LanguageDisplay = ({ language }) => <li>{language}</li>;

const WeatherDetail = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    weatherService
      .getGeocode(city)
      .then((results) => ({ latitude: results[0].lat, longitude: results[0].lon }))
      .then((geoCode) => weatherService.getWeatherDetail(geoCode))
      .then((weatherInfo) => {
        const { wind_speed: windSpeed, temp: temperature } = weatherInfo.current;
        const { weather } = weatherInfo.current;
        const { icon } = weather.length >= 1 && weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        setWeatherData({
          ...weatherData,
          temperature,
          iconUrl,
          windSpeed,
        });
      })
      .catch((error) => console.error(error));
  }, [city]);

  if (!weatherData) return null;

  return (
    <div>
      <h2>{`${WEATHER_HEADING} ${city}`}</h2>
      <p>{`${TEMPERATURE} ${weatherData.temperature} ${CELSIUS}`}</p>
      <img src={weatherData.iconUrl} alt="Weather state" width="150px" />
      <p>{`${WIND} ${weatherData.windSpeed} ${METER_PER_SECOND}`}</p>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  const capitalName = capital.length === 1 ? capital[0] : NO_CAPITAL;
  return (
    <div>
      <h2>{name.common}</h2>
      <p>
        {CAPITAL} {capitalName}
      </p>
      <p>
        {AREA} {+area}
      </p>
      <strong>{LANGUAGES}</strong>
      <ul>
        {Object.values(languages).map((language) => (
          <LanguageDisplay key={language} language={language} />
        ))}
      </ul>
      <img src={flags.svg} alt={flags.alt} width="250px" style={{ marginBottom: '8px' }} />
      <WeatherDetail city={capitalName} />
    </div>
  );
};

const Country = ({ country, shouldShowDetail }) => {
  const [showDetail, setShowDetail] = useState(shouldShowDetail);
  const { name } = country;
  const countryDisplay = showDetail ? <CountryDetail country={country} /> : name.common;
  return (
    <div style={{ marginBottom: '16px' }}>
      {countryDisplay}{' '}
      {!shouldShowDetail && (
        <Button text={showDetail ? HIDE : SHOW} handleClick={() => setShowDetail(!showDetail)} />
      )}
    </div>
  );
};

export default Country;
