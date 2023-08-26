import data from "./data.json";

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

export const allPostcodes: State[] = data.state;

/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
export const getStates = (): string[] => {
  return allPostcodes.map((state) => state.name);
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
    (state) => state.name.toLowerCase() === selectedState.toLowerCase()
  );

  return stateObj ? stateObj.city.map((city) => city.name) : [];
};

/**
 * Finds the states and their postcodes based on a city name or partial city name.
 * @param cityName - The name or partial name of the city to search for.
 * @param isExactMatch - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export const findCities = (
  cityName: string | null,
  isExactMatch: boolean = true
): CitySearchResult => {
  if (typeof isExactMatch !== "boolean") {
    isExactMatch = true;
  }

  if (!cityName) {
    return { found: false };
  }

  let results: IndividualCityResult[] = [];

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
 * Finds the state and city based on a given postcode.
 * @param {string} postcode - The postcode to search for.
 * @param {boolean} [isExactMatch] - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns {Object} An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export const findPostcode = (
  postcode: string | null,
  isExactMatch: boolean = true
): PostcodeSearchResult => {
  if (typeof isExactMatch !== "boolean") {
    isExactMatch = true;
  }

  if (!postcode) {
    return { found: false };
  }

  let matches: { state: string; city: string; postcode: string }[] = [];

  for (const state of allPostcodes) {
    for (const city of state.city) {
      if (isExactMatch && city.postcode.includes(postcode)) {
        return {
          found: true,
          state: state.name,
          city: city.name,
          postcode: postcode,
        };
      } else if (!isExactMatch) {
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

  if (!isExactMatch && matches.length > 0) {
    return {
      found: true,
      results: matches,
    };
  }

  return { found: false };
};
