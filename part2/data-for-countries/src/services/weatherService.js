import axios from 'axios';

const weatherService = (() => {
  const apiKey = process.env.REACT_APP_WEATHER_APP_API_KEY;
  const geoCodingApiRoute = 'http://api.openweathermap.org/geo/1.0/direct';
  const weatherApiRoute = 'https://api.openweathermap.org/data/3.0/onecall';

  const getGeocode = (city) =>
    axios.get(`${geoCodingApiRoute}?q=${city}&appid=${apiKey}`).then((response) => response.data);

  const getWeatherDetail = ({ latitude, longitude }) =>
    axios
      .get(
        `${weatherApiRoute}?lat=${latitude}&lon=${longitude}&exclude=hourly,daily,minutely,alerts&units=metric&appid=${apiKey}`
      )
      .then((response) => response.data);
  return {
    getGeocode,
    getWeatherDetail,
  };
})();

export default weatherService;
