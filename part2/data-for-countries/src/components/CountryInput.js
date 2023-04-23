import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

const CountryInput = ({
  handleCountrySearch,
  handleUserSearch,
  handleErrorMessageClear,
  hasErrorMessage,
}) => {
  const [countryQuery, setCountryQuery] = useState('');

  const debouncedSearchHandler = useCallback(debounce(handleCountrySearch, 1000), []);
  const handleInputChange = useCallback((event) => {
    debouncedSearchHandler.cancel();
    const inputValue = event.target.value;
    setCountryQuery(inputValue);
    if (hasErrorMessage) {
      handleErrorMessageClear();
    }
    if (inputValue) {
      handleUserSearch();
    }
    debouncedSearchHandler(inputValue);
  }, []);

  const style = {
    marginBottom: '10px',
  };

  return (
    <div style={style}>
      <label>
        Find countries <input type="text" value={countryQuery} onChange={handleInputChange} />
      </label>
    </div>
  );
};

export default CountryInput;
