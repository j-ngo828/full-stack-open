import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

const CountryInput = ({ handleCountrySearch }) => {
  const [countryQuery, setCountryQuery] = useState('');
  const debouncedSearchHandler = useCallback(debounce(handleCountrySearch, 1000), []);
  const style = {
    marginBottom: '10px',
  };
  return (
    <div style={style}>
      <label>
        Find countries{' '}
        <input
          type="text"
          value={countryQuery}
          onChange={(event) => {
            setCountryQuery(event.target.value);
            debouncedSearchHandler.cancel();
            debouncedSearchHandler(event.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default CountryInput;
