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
  let results = [];

  const cityMatcher = (cityName, targetName) => {
    const formattedCityName = cityName.toLowerCase();
    const formattedTargetName = targetName.toLowerCase();

    return isExactMatch
      ? formattedCityName === formattedTargetName
      : formattedTargetName.includes(formattedCityName);
  };

  allPostcodes.forEach((state) => {
    state.city.forEach((city) => {
      if (cityMatcher(cityName, city.name)) {
        results.push({
          state: state.name,
          city: city.name,
          postcodes: city.postcode,
        });
      }
    });
  });

  if (!results.length) return { found: false };

  if (isExactMatch) {
    return results[0] ? { found: true, ...results[0] } : { found: false };
  }

  return {
    found: true,
    results,
  };
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
 * @param {boolean} [exact=true] - Determines the type of search. If true, an exact match for the postcode is searched. If false, it will search for postcodes that contain the given substring.
 * @returns {Object} An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
const findPostcode = (postcode, exact = true) => {
  let matches = [];

  for (const state of allPostcodes) {
    for (const city of state.city) {
      if (exact && city.postcode.includes(postcode)) {
        return {
          found: true,
          state: state.name,
          city: city.name,
          postcode: postcode,
        };
      } else if (!exact) {
        for (const pc of city.postcode) {
          if (pc.includes(postcode)) {
            matches.push({
              state: state.name,
              city: city.name,
              postcode: pc,
            });
          }
        }
      }
    }
  }

  if (!exact && matches.length > 0) {
    return {
      found: true,
      results: matches,
    };
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
