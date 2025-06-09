import './styles.css';

import {
  getCities,
  getPostcodes,
  getPostcodesByPrefix,
  getStates
} from 'malaysia-postcodes';
import { useEffect, useState } from 'react';

function App() {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [postcodes, setPostcodes] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPostcode, setSelectedPostcode] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const allStates = getStates();
    setStates(allStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const stateCities = getCities(selectedState);
      setCities(stateCities);
      setSelectedCity('');
      setSelectedPostcode('');
      setPostcodes([]);
    } else {
      setCities([]);
      setPostcodes([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      const cityPostcodes = getPostcodes(selectedState, selectedCity);
      setPostcodes(cityPostcodes);
      setSelectedPostcode('');
    } else {
      setPostcodes([]);
    }
  }, [selectedState, selectedCity]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.length >= 2) {
      const results = getPostcodesByPrefix(query);
      setSearchResults(results.slice(0, 10));
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const selectSearchResult = (postcode: string) => {
    setSearchQuery(postcode);
    setShowDropdown(false);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🇲🇾 Malaysia Postcodes</h1>
        <p>React Example</p>
      </div>

      {/* Address Selection Section */}
      <div className="section">
        <h2>📍 Address Selection</h2>
        <p>Select state, then city, then postcode in sequence.</p>

        <div className="form-row">
          {/* State Dropdown */}
          <div className="form-group">
            <label>State:</label>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
            >
              <option value="">-- Select State --</option>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="form-group">
            <label>City:</label>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">-- Select City --</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Postcode Dropdown */}
          <div className="form-group">
            <label>Postcode:</label>
            <select
              value={selectedPostcode}
              onChange={e => setSelectedPostcode(e.target.value)}
              disabled={!selectedCity}
            >
              <option value="">-- Select Postcode --</option>
              {postcodes.map(postcode => (
                <option key={postcode} value={postcode}>
                  {postcode}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Show selected address */}
        {selectedState && selectedCity && selectedPostcode && (
          <div className="result-info">
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
        <p>Type to search for postcodes. Start typing at least 2 characters.</p>

        <div className="search-container">
          <div className="form-group">
            <label>Search Postcodes:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Type postcode (e.g., 500, 401, 142)..."
            />
          </div>

          {/* Search Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map(postcode => (
                <div
                  key={postcode}
                  onClick={() => selectSearchResult(postcode)}
                  className="search-item"
                >
                  {postcode}
                </div>
              ))}
            </div>
          )}
        </div>

        {searchQuery && !showDropdown && (
          <div className="result-success">
            Selected postcode: <strong>{searchQuery}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
