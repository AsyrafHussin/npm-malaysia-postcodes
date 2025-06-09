import data from './data.json';

export interface City {
  name: string;
  postcode: string[];
}

export interface State {
  name: string;
  city: City[];
}

export interface IndividualCityResult {
  state: string;
  city: string;
  postcodes: string[];
}

export interface CitySearchResult {
  found: boolean;
  results?: IndividualCityResult[];
  state?: string;
  city?: string;
  postcodes?: string[];
}

export interface PostcodeSearchResult {
  found: boolean;
  state?: string;
  city?: string;
  postcode?: string;
  results?: {
    state: string;
    city: string;
    postcode: string;
  }[];
}

export interface SearchAllResult {
  found: boolean;
  states: string[];
  cities: IndividualCityResult[];
  postcodes: {
    state: string;
    city: string;
    postcode: string;
  }[];
}

export const allPostcodes: State[] = data.state;

/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
export const getStates = (): string[] => {
  return allPostcodes.map(state => state.name);
};

/**
 * Gets all cities for a given state.
 * @param selectedState - The name of the state for which cities are to be retrieved.
 * @returns Array containing names of cities for the selected state. Empty array if the state is not found.
 */
export const getCities = (selectedState: string | null): string[] => {
  if (!selectedState) {
    return [];
  }

  const stateObj = allPostcodes.find(
    state => state.name.toLowerCase() === selectedState.toLowerCase()
  );

  return stateObj ? stateObj.city.map(city => city.name) : [];
};

/**
 * Finds the states and their postcodes based on a city name or partial city name.
 * @param cityName - The name or partial name of the city to search for, or an array of city names.
 * @param isExactMatch - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export const findCities = (
  cityName: string | string[] | null,
  isExactMatch: boolean = true
): CitySearchResult => {
  if (typeof isExactMatch !== 'boolean') {
    isExactMatch = true;
  }

  if (!cityName) {
    return { found: false };
  }

  if (Array.isArray(cityName)) {
    const allResults: IndividualCityResult[] = [];

    for (const city of cityName) {
      const result = findCities(city, isExactMatch);
      if (result.found) {
        if (result.results) {
          allResults.push(...result.results);
        } else if (result.state && result.city && result.postcodes) {
          allResults.push({
            state: result.state,
            city: result.city,
            postcodes: result.postcodes
          });
        }
      }
    }

    return allResults.length > 0
      ? { found: true, results: allResults }
      : { found: false };
  }

  const results: IndividualCityResult[] = [];

  const cityMatcher = (cityName: string, targetName: string): boolean => {
    const formattedCityName = cityName.toLowerCase();
    const formattedTargetName = targetName.toLowerCase();

    return isExactMatch
      ? formattedCityName === formattedTargetName
      : formattedTargetName.includes(formattedCityName);
  };

  allPostcodes.forEach((state: State) => {
    state.city.forEach((city: City) => {
      if (cityMatcher(cityName, city.name)) {
        results.push({
          state: state.name,
          city: city.name,
          postcodes: city.postcode
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
    results
  };
};

/**
 * Retrieves all postcodes for a given state and city.
 * @param {string} state - The name of the state.
 * @param {string} city - The name of the city.
 * @returns {Array} Array containing postcodes for the selected state and city. Empty array if not found.
 */
export const getPostcodes = (
  state: string | null,
  city: string | null
): string[] => {
  if (!state || !city) {
    return [];
  }

  const stateObj = allPostcodes.find(
    (s: State) => s.name.toLowerCase() === state.toLowerCase()
  );
  if (stateObj) {
    const cityObj = stateObj.city.find(
      (c: City) => c.name.toLowerCase() === city.toLowerCase()
    );
    return cityObj ? cityObj.postcode : [];
  }
  return [];
};

/**
 * Finds the state and city based on a given postcode or array of postcodes.
 * @param {string | string[]} postcode - The postcode(s) to search for.
 * @param {boolean} [isExactMatch] - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns {Object} An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export const findPostcode = (
  postcode: string | string[] | null,
  isExactMatch: boolean = true
): PostcodeSearchResult => {
  if (typeof isExactMatch !== 'boolean') {
    isExactMatch = true;
  }

  if (!postcode) {
    return { found: false };
  }

  if (Array.isArray(postcode)) {
    const allMatches: { state: string; city: string; postcode: string }[] = [];

    for (const pc of postcode) {
      const result = findPostcode(pc, isExactMatch);
      if (result.found) {
        if (result.results) {
          allMatches.push(...result.results);
        } else if (result.state && result.city && result.postcode) {
          allMatches.push({
            state: result.state,
            city: result.city,
            postcode: result.postcode
          });
        }
      }
    }

    return allMatches.length > 0
      ? { found: true, results: allMatches }
      : { found: false };
  }

  const matches: { state: string; city: string; postcode: string }[] = [];

  for (const state of allPostcodes) {
    for (const city of state.city) {
      if (isExactMatch && city.postcode.includes(postcode)) {
        return {
          found: true,
          state: state.name,
          city: city.name,
          postcode: postcode
        };
      } else if (!isExactMatch) {
        for (const pc of city.postcode) {
          if (pc.includes(postcode)) {
            matches.push({
              state: state.name,
              city: city.name,
              postcode: pc
            });
          }
        }
      }
    }
  }

  if (!isExactMatch && matches.length > 0) {
    return {
      found: true,
      results: matches
    };
  }

  return { found: false };
};

/**
 * This function returns an array of postcodes that match the given prefix.
 * The prefix should be between 1 and 5 characters long.
 *
 * @param prefix - The prefix to match against the postcodes
 * @returns An array of matching postcodes
 */
export const getPostcodesByPrefix = (prefix: string | null): string[] => {
  if (!prefix || prefix.length < 1 || prefix.length > 5) {
    return [];
  }

  const matchingPostcodes: string[] = [];

  for (const stateData of allPostcodes) {
    for (const cityData of stateData.city) {
      for (const postcode of cityData.postcode) {
        if (postcode.startsWith(prefix)) {
          matchingPostcodes.push(postcode);
        }
      }
    }
  }

  return matchingPostcodes;
};

/**
 * Universal search function that searches across states, cities, and postcodes.
 * @param query - The search query to match against states, cities, or postcodes.
 * @returns An object containing matched states, cities, and postcodes.
 */
export const searchAll = (query: string | null): SearchAllResult => {
  if (!query || query.trim().length === 0) {
    return { found: false, states: [], cities: [], postcodes: [] };
  }

  const queryLower = query.toLowerCase().trim();
  const states: string[] = [];
  const cities: IndividualCityResult[] = [];
  const postcodes: { state: string; city: string; postcode: string }[] = [];

  allPostcodes.forEach(state => {
    if (state.name.toLowerCase().includes(queryLower)) {
      states.push(state.name);
    }
  });

  const cityResults = findCities(query, false);
  if (cityResults.found && cityResults.results) {
    cities.push(...cityResults.results);
  }

  const postcodeResults = findPostcode(query, false);
  if (postcodeResults.found && postcodeResults.results) {
    postcodes.push(...postcodeResults.results);
  }

  const hasResults =
    states.length > 0 || cities.length > 0 || postcodes.length > 0;

  if (!hasResults) {
    return { found: false, states: [], cities: [], postcodes: [] };
  }

  const result: SearchAllResult = { found: true, states, cities, postcodes };

  return result;
};

/**
 * Returns a random valid postcode from the dataset.
 * @returns A random postcode string.
 */
export const getRandomPostcode = (): string => {
  const allPostcodesList: string[] = [];

  allPostcodes.forEach(state => {
    state.city.forEach(city => {
      allPostcodesList.push(...city.postcode);
    });
  });

  const randomIndex = Math.floor(Math.random() * allPostcodesList.length);
  return allPostcodesList[randomIndex];
};

/**
 * Returns a random city name from the dataset.
 * @param stateName - Optional state name to get random city from specific state.
 * @returns A random city name string.
 */
export const getRandomCity = (stateName?: string | null): string => {
  let availableCities: string[] = [];

  if (stateName) {
    const stateObj = allPostcodes.find(
      state => state.name.toLowerCase() === stateName.toLowerCase()
    );
    if (stateObj) {
      availableCities = stateObj.city.map(city => city.name);
    }
  } else {
    allPostcodes.forEach(state => {
      availableCities.push(...state.city.map(city => city.name));
    });
  }

  if (availableCities.length === 0) {
    return '';
  }

  const randomIndex = Math.floor(Math.random() * availableCities.length);
  return availableCities[randomIndex];
};

/**
 * Returns a random state name from the dataset.
 * @returns A random state name string.
 */
export const getRandomState = (): string => {
  const states = getStates();
  const randomIndex = Math.floor(Math.random() * states.length);
  return states[randomIndex];
};
