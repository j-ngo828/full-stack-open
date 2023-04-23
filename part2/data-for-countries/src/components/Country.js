import { useState } from 'react';

const SHOW = 'show';
const HIDE = 'hide';
const CAPITAL = 'capital';
const AREA = 'area';
const LANGUAGES = 'languages:';
const NO_CAPITAL = 'no capital';

const Button = ({ text, handleClick }) => (
  <button type="button" onClick={handleClick}>
    {text}
  </button>
);

const LanguageDisplay = ({ language }) => <li>{language}</li>;

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
      <Button text={showDetail ? HIDE : SHOW} handleClick={() => setShowDetail(!showDetail)} />
    </div>
  );
};

export default Country;
