import axios from 'axios';

const countryApiUrl = 'https://restcountries.com/v3.1/name';
const filterApiUrl = 'fields=name,capital,area,languages,flags';

// Example:
// https://restcountries.com/v3.1/name/sw?fields=name,capital,area,languages,flags
// `${countryApiUrl}/${countryQuery}?${filterApiUrl}`

const getCountries = (countryQuery) =>
  axios.get(`${countryApiUrl}/${countryQuery}?${filterApiUrl}`).then((response) => response.data);

export default { getCountries };
