const FILTER_INPUT_LABEL = 'filter shown with'

const Filter = ({nameSearchQuery, handleNameQueryInputChange}) =>
  <p>
    {FILTER_INPUT_LABEL} <input value={nameSearchQuery} onChange={handleNameQueryInputChange} />
  </p>

export default Filter
