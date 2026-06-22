import Select, { type SingleValue } from 'react-select';
import {
  getCities,
  getPostcodes,
  getPostcodesByPrefix,
  getStates
} from 'malaysia-postcodes';
import { useMemo, useState } from 'react';
import './styles.css';

interface Option {
  value: string;
  label: string;
}

const toOptions = (values: string[]): Option[] =>
  values.map(value => ({ value, label: value }));

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPostcode, setSelectedPostcode] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Option[]>([]);

  // Derive dependent option lists during render instead of syncing them
  // with effects (see https://react.dev/learn/you-might-not-need-an-effect).
  const stateOptions = useMemo(() => toOptions(getStates()), []);
  const cityOptions = useMemo(
    () => (selectedState ? toOptions(getCities(selectedState)) : []),
    [selectedState]
  );
  const postcodeOptions = useMemo(
    () =>
      selectedState && selectedCity
        ? toOptions(getPostcodes(selectedState, selectedCity))
        : [],
    [selectedState, selectedCity]
  );

  const handleStateChange = (selectedOption: SingleValue<Option>) => {
    setSelectedState(selectedOption?.value || '');
    setSelectedCity('');
    setSelectedPostcode('');
  };

  const handleCityChange = (selectedOption: SingleValue<Option>) => {
    setSelectedCity(selectedOption?.value || '');
    setSelectedPostcode('');
  };

  const handlePostcodeChange = (selectedOption: SingleValue<Option>) => {
    setSelectedPostcode(selectedOption?.value || '');
  };

  const handleSearchInputChange = (
    inputValue: string,
    actionMeta: { action: string }
  ) => {
    if (
      actionMeta.action !== 'input-blur' &&
      actionMeta.action !== 'menu-close'
    ) {
      setSearchTerm(inputValue);

      if (
        inputValue.length >= 1 &&
        inputValue.length <= 5 &&
        /^\d+$/.test(inputValue)
      ) {
        setSearchResults(
          toOptions(getPostcodesByPrefix(inputValue).slice(0, 10))
        );
      } else {
        setSearchResults([]);
      }
    }
  };

  const handleSearchSelect = (selectedOption: SingleValue<Option>) => {
    setSearchTerm(selectedOption ? selectedOption.value : '');
    setSearchResults([]);
  };

  const getSelectedOption = (
    value: string,
    options: Option[]
  ): Option | null => {
    return options.find(option => option.value === value) || null;
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🇲🇾 Malaysia Postcodes</h1>
        <p>React Select Example</p>
      </div>

      {/* Address Selection */}
      <div className="section">
        <h2>📍 Address Selection</h2>

        <div className="form-group">
          <label>State:</label>
          <Select
            options={stateOptions}
            value={getSelectedOption(selectedState, stateOptions)}
            onChange={handleStateChange}
            placeholder="Select State"
            isSearchable
            isClearable
          />
        </div>

        <div className="form-group">
          <label>City:</label>
          <Select
            options={cityOptions}
            value={getSelectedOption(selectedCity, cityOptions)}
            onChange={handleCityChange}
            placeholder={selectedState ? 'Select City' : 'Select a state first'}
            isSearchable
            isClearable
            isDisabled={!selectedState}
          />
        </div>

        <div className="form-group">
          <label>Postcode:</label>
          <Select
            options={postcodeOptions}
            value={getSelectedOption(selectedPostcode, postcodeOptions)}
            onChange={handlePostcodeChange}
            placeholder={
              selectedCity ? 'Select Postcode' : 'Select a city first'
            }
            isSearchable
            isClearable
            isDisabled={!selectedCity}
          />
        </div>

        {/* Display selected address */}
        {selectedState && selectedCity && selectedPostcode && (
          <div className="result-success">
            <strong>✅ Complete Address Selected:</strong>
            <br />
            📍 State: <code>{selectedState}</code>
            <br />
            🏘️ City: <code>{selectedCity}</code>
            <br />
            📮 Postcode: <code>{selectedPostcode}</code>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="section">
        <h2>🔍 Postcode Search</h2>

        <div className="form-group">
          <label>Search Postcodes:</label>
          <Select
            options={searchResults}
            onInputChange={handleSearchInputChange}
            onChange={handleSearchSelect}
            inputValue={searchTerm}
            placeholder="Type postcode numbers (e.g., 170)"
            isSearchable
            isClearable
            noOptionsMessage={({ inputValue }) =>
              inputValue.length === 0
                ? 'Type to search postcodes...'
                : searchResults.length === 0
                  ? 'No postcodes found'
                  : 'Keep typing...'
            }
            filterOption={() => true}
          />
          <small className="help-text">
            💡 Enter 1-5 digits to see matching postcodes
          </small>
        </div>

        {searchTerm && (
          <div className="result-info">
            <strong>🔍 Selected postcode:</strong> {searchTerm}
          </div>
        )}
      </div>

      {/* Functions Used */}
      <div className="section">
        <h2>📦 Functions Used</h2>
        <ul className="functions-list">
          <li>
            <code>getStates()</code> - Get all states
          </li>
          <li>
            <code>getCities(state)</code> - Get cities for state
          </li>
          <li>
            <code>getPostcodes(state, city)</code> - Get postcodes for city
          </li>
          <li>
            <code>getPostcodesByPrefix(prefix)</code> - Search by prefix
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
