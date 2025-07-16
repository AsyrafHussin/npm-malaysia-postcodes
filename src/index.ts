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
  return allPostcodes
    .filter(state => state.name.toLowerCase() === selectedState?.toLowerCase())
    .map(stateObj => stateObj.city)
    .flat()
    .map(city => city.name);
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
  if (!cityName) return { found: false };

  if (isExactMatch !== false) isExactMatch = true;

  const allCities = _getPopulatedCities();

  if (Array.isArray(cityName))
    return _findCitiesByCityNameArr(allCities, cityName, isExactMatch);

  // cityname NOT array
  if (isExactMatch)
    return _findFirstExactCity(allCities, cityName?.toLowerCase());

  return _findPartialMatchedCities(allCities, cityName?.toLowerCase());
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
  if (!_hasMatchedState(state)) {
    return [];
  }

  return allPostcodes
    .map(stateObj => stateObj.city)
    .flat()
    .filter(cityObj => cityObj.name.toLowerCase() === city?.toLowerCase())
    .map(cityObj => cityObj.postcode)
    .flat();
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
  if (!postcode) return { found: false };

  if (isExactMatch !== false) isExactMatch = true;

  const allPopulatedPostcodes = _getPopulatedPostcodes();

  if (Array.isArray(postcode)) {
    return _findPostcodeByPostcodeArr(
      allPopulatedPostcodes,
      postcode,
      isExactMatch
    );
  }

  // postcode NOT array
  if (isExactMatch)
    return _findFirstExactPostcode(
      allPopulatedPostcodes,
      postcode.toLowerCase()
    );

  return _findPartialMatchedPostcode(
    allPopulatedPostcodes,
    postcode.toLowerCase()
  );
};

/**
 * This function returns an array of postcodes that match the given prefix.
 * The prefix should be between 1 and 5 characters long.
 *
 * @param prefix - The prefix to match against the postcodes
 * @returns An array of matching postcodes
 */
export const getPostcodesByPrefix = (prefix: string | null): string[] => {
  return _getAllPostcodes().filter(postcode =>
    postcode.startsWith(prefix || 'undefined')
  );
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

  const hasResults = Boolean(
    states.length || cities.length || postcodes.length
  );

  return { found: hasResults, states, cities, postcodes };
};

/**
 * Returns a random valid postcode from the dataset.
 * @returns A random postcode string.
 */
export const getRandomPostcode = (): string => {
  const allPostcodes = _getAllPostcodes();
  const randomIndex = Math.floor(Math.random() * allPostcodes.length);
  return allPostcodes[randomIndex];
};

/**
 * Returns a random city name from the dataset.
 * @param stateName - Optional state name to get random city from specific state.
 * @returns A random city name string.
 */
export const getRandomCity = (stateName?: string | null): string => {
  if (stateName && !_hasMatchedState(stateName)) {
    return '';
  }
  const availableCities =
    stateName === undefined || stateName === null
      ? _getAllCityObjs()
      : _getStateObj(stateName)?.city || [];

  const randomIndex = Math.floor(Math.random() * availableCities.length);
  return availableCities[randomIndex].name;
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

// ------- helper function -------
const _getStateObj = (state: string | null) => {
  return allPostcodes.find(
    stateObj => stateObj.name.toLowerCase() === state?.toLowerCase()
  );
};

const _hasMatchedState = (state: string | null) => {
  return _getStateObj(state) !== undefined;
};

const _getAllCityObjs = () => {
  return allPostcodes.map(stateObj => stateObj.city).flat();
};

const _getAllPostcodes = () => {
  return allPostcodes
    .map(stateObj => stateObj.city)
    .flat()
    .map(cityObj => cityObj.postcode)
    .flat();
};

const _getPopulatedCities = () => {
  const res: IndividualCityResult[] = [];

  allPostcodes.forEach(state => {
    state.city.forEach(city => {
      res.push({
        state: state.name,
        city: city.name,
        postcodes: city.postcode
      });
    });
  });

  return res;
};

const _findFirstExactCity = (
  allCities: IndividualCityResult[],
  cityName: string
): CitySearchResult => {
  const firstCity = allCities.find(
    ({ city }) => city.toLowerCase() === cityName
  );
  const found = Boolean(firstCity);
  return found ? { found, ...firstCity } : { found: false };
};

const _findPartialMatchedCities = (
  allCities: IndividualCityResult[],
  cityName: string
): CitySearchResult => {
  const results: IndividualCityResult[] = allCities.filter(({ city }) =>
    city.toLowerCase().includes(cityName)
  );
  const found = Boolean(results.length);
  return found ? { found, results } : { found: false };
};

const _findCitiesByCityNameArr = (
  allCities: IndividualCityResult[],
  cityNameArr: string[],
  isExactMatch: boolean
): CitySearchResult => {
  const results: IndividualCityResult[] = [];

  cityNameArr.forEach(cityName => {
    cityName = cityName.toLowerCase();
    if (isExactMatch) {
      const { found, state, city, postcodes } = _findFirstExactCity(
        allCities,
        cityName
      );
      if (found && state && city && postcodes)
        results.push({ state, city, postcodes });
    } else {
      const { found, results: subResults } = _findPartialMatchedCities(
        allCities,
        cityName
      );
      if (found && subResults) results.push(...subResults);
    }
  });

  const found = Boolean(results.length);
  return found ? { found, results } : { found: false };
};

const _getPopulatedPostcodes = () => {
  const res: { state: string; city: string; postcode: string }[] = [];

  allPostcodes.forEach(state => {
    state.city.forEach(city => {
      city.postcode.forEach(pc => {
        res.push({
          state: state.name,
          city: city.name,
          postcode: pc
        });
      });
    });
  });

  return res;
};

const _findFirstExactPostcode = (
  allPopulatedPostcodes: { state: string; city: string; postcode: string }[],
  targetPostcode: string
): PostcodeSearchResult => {
  const firstPostcode = allPopulatedPostcodes.find(
    ({ postcode }) => postcode.toLowerCase() === targetPostcode
  );
  const found = Boolean(firstPostcode);
  return found ? { found, ...firstPostcode } : { found: false };
};

const _findPartialMatchedPostcode = (
  allPopulatedPostcodes: { state: string; city: string; postcode: string }[],
  targetPostcode: string
): PostcodeSearchResult => {
  const results = allPopulatedPostcodes.filter(({ postcode }) =>
    postcode.toLowerCase().includes(targetPostcode)
  );
  const found = Boolean(results.length);
  return found ? { found, results } : { found: false };
};

const _findPostcodeByPostcodeArr = (
  allPopulatedPostcodes: { state: string; city: string; postcode: string }[],
  postcodeArr: string[],
  isExactMatch: boolean
): PostcodeSearchResult => {
  const results: { state: string; city: string; postcode: string }[] = [];

  postcodeArr.forEach(postcode => {
    postcode = postcode.toLowerCase();
    if (isExactMatch) {
      const {
        found,
        state,
        city,
        postcode: pc
      } = _findFirstExactPostcode(allPopulatedPostcodes, postcode);
      if (found && state && city && pc)
        results.push({ state, city, postcode: pc });
    } else {
      const { found, results: subResults } = _findPartialMatchedPostcode(
        allPopulatedPostcodes,
        postcode
      );
      if (found && subResults) results.push(...subResults);
    }
  });

  const found = Boolean(results.length);
  return found ? { found, results } : { found: false };
};
