// Load data from the JSON file
const data = require("./data.json");

// Extract all postcode data for the states
const allPostcodes = data.state;

/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
const getStates = () => {
  return allPostcodes.map((state) => state.name);
};

/**
 * Gets all cities for a given state.
 * @param {string} selectedState - The name of the state for which cities are to be retrieved.
 * @returns {Array} Array containing names of cities for the selected state. Empty array if the state is not found.
 */
const getCities = (selectedState) => {
  const stateObj = allPostcodes.find(
    (state) => state.name.toLowerCase() === selectedState.toLowerCase()
  );
  return stateObj ? stateObj.city.map((city) => city.name) : [];
};

/**
 * Finds the states and their postcodes based on a city name or partial city name.
 * @param {string} cityName - The name or partial name of the city to search for.
 * @param {boolean} isExactMatch - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns {Object/Array} A single object for exact matches or an array of objects for "like" pattern matches.
 */
const findCities = (cityName, isExactMatch = true) => {
  const matchingStates = allPostcodes.filter((state) =>
    state.city.some((city) =>
      isExactMatch
        ? city.name.toLowerCase() === cityName.toLowerCase()
        : city.name.toLowerCase().includes(cityName.toLowerCase())
    )
  );

  if (!matchingStates.length) return { found: false };

  const results = matchingStates.flatMap((state) => {
    const matchingCities = state.city.filter((city) =>
      isExactMatch
        ? city.name.toLowerCase() === cityName.toLowerCase()
        : city.name.toLowerCase().includes(cityName.toLowerCase())
    );

    return matchingCities.map((cityObj) => ({
      state: state.name,
      city: cityObj.name,
      postcodes: cityObj.postcode,
    }));
  });

  if (isExactMatch) {
    return results[0] ? { found: true, ...results[0] } : { found: false };
  } else {
    return {
      found: true,
      results,
    };
  }
};

/**
 * Retrieves all postcodes for a given state and city.
 * @param {string} state - The name of the state.
 * @param {string} city - The name of the city.
 * @returns {Array} Array containing postcodes for the selected state and city. Empty array if not found.
 */
const getPostcodes = (state, city) => {
  const stateObj = allPostcodes.find(
    (s) => s.name.toLowerCase() === state.toLowerCase()
  );
  if (stateObj) {
    const cityObj = stateObj.city.find(
      (c) => c.name.toLowerCase() === city.toLowerCase()
    );
    return cityObj ? cityObj.postcode : [];
  }
  return [];
};

/**
 * Finds the state and city based on a given postcode.
 * @param {string} postcode - The postcode to search for.
 * @returns {Object} An object containing 'found' (boolean), 'state' (string if found), and 'city' (string if found).
 */
const findPostcode = (postcode) => {
  for (const state of allPostcodes) {
    for (const city of state.city) {
      if (city.postcode.includes(postcode)) {
        return {
          found: true,
          state: state.name,
          city: city.name,
        };
      }
    }
  }
  return { found: false };
};

// Exporting the functions and data for external use
module.exports = {
  allPostcodes,
  getStates,
  getCities,
  findCities,
  getPostcodes,
  findPostcode,
};
