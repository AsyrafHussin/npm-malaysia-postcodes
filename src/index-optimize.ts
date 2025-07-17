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

// Trie Node for prefix matching
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  postcodes: Set<string> = new Set();
}

// Preprocessed data structures for O(1) lookups
class OptimizedDataStructure {
  private stateMap: Map<string, State>;
  private cityToStateMap: Map<string, string>;
  private cityToPostcodesMap: Map<string, string[]>;
  private postcodeToLocationMap: Map<string, { state: string; city: string }>;
  private stateToQcitiresMap: Map<string, string[]>;
  private postcodeTrie: TrieNode;
  private allStateNames: string[];
  private allCityNames: string[];
  private allPostcodesList: string[];

  // Caching
  private citySearchCache: Map<string, CitySearchResult> = new Map();
  private postcodeSearchCache: Map<string, PostcodeSearchResult> = new Map();
  private prefixCache: Map<string, string[]> = new Map();
  private searchAllCache: Map<string, SearchAllResult> = new Map();
  private readonly MAX_CACHE_SIZE = 10000;

  constructor(states: State[]) {
    this.stateMap = new Map();
    this.cityToStateMap = new Map();
    this.cityToPostcodesMap = new Map();
    this.postcodeToLocationMap = new Map();
    this.stateToQcitiresMap = new Map();
    this.postcodeTrie = new TrieNode();
    this.allStateNames = [];
    this.allCityNames = [];
    this.allPostcodesList = [];

    this.buildIndices(states);
  }

  private buildIndices(states: State[]): void {
    // Build all lookup structures
    for (const state of states) {
      const stateLower = state.name.toLowerCase();
      this.stateMap.set(stateLower, state);
      this.allStateNames.push(state.name);

      const citiesInState: string[] = [];

      for (const city of state.city) {
        const cityLower = city.name.toLowerCase();

        // City to state mapping
        this.cityToStateMap.set(cityLower, state.name);

        // City to postcodes mapping
        this.cityToPostcodesMap.set(cityLower, city.postcode);

        // Add to cities list
        this.allCityNames.push(city.name);
        citiesInState.push(city.name);

        // Build postcode mappings and trie
        for (const postcode of city.postcode) {
          // Postcode to location mapping
          this.postcodeToLocationMap.set(postcode, {
            state: state.name,
            city: city.name
          });

          // Add to all postcodes list
          this.allPostcodesList.push(postcode);

          // Build trie for prefix matching
          this.insertIntoTrie(postcode);
        }
      }

      this.stateToQcitiresMap.set(stateLower, citiesInState);
    }
  }

  private insertIntoTrie(postcode: string): void {
    let current = this.postcodeTrie;

    for (let i = 0; i < postcode.length; i++) {
      const char = postcode[i];

      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }

      current = current.children.get(char)!;
      current.postcodes.add(postcode);
    }
  }

  private manageCacheSize<T>(cache: Map<string, T>): void {
    if (cache.size > this.MAX_CACHE_SIZE) {
      const entries = Array.from(cache.entries());
      const keepCount = Math.floor(this.MAX_CACHE_SIZE * 0.7);
      for (let i = 0; i < entries.length - keepCount; i++) {
        cache.delete(entries[i][0]);
      }
    }
  }

  private findFirstExactCity = (cityName: string): CitySearchResult => {
    // Check cache
    const cacheKey = `${cityName}:${true}`;
    if (this.citySearchCache.has(cacheKey)) {
      return this.citySearchCache.get(cacheKey)!;
    }

    // O(1) exact lookup
    const cityLower = cityName.toLowerCase();
    const stateName = this.cityToStateMap.get(cityLower);
    const postcodes = this.cityToPostcodesMap.get(cityLower);

    const result: CitySearchResult =
      stateName && postcodes
        ? { found: true, state: stateName, city: cityName, postcodes }
        : { found: false };

    this.citySearchCache.set(cacheKey, result);
    return result;
  };

  private findPartialMatchedCities = (cityName: string): CitySearchResult => {
    // Partial matching - still need to iterate but with optimized checks
    // Check cache
    const cacheKey = `${cityName}:${false}`;
    if (this.citySearchCache.has(cacheKey)) {
      return this.citySearchCache.get(cacheKey)!;
    }

    // O(N) lookup where N = total city length
    const cityLower = cityName.toLowerCase();
    const matchedCityNames = this.allCityNames.filter(city =>
      city.toLowerCase().includes(cityLower)
    );

    const results: IndividualCityResult[] = matchedCityNames.map(city => {
      const matchedLower = city.toLowerCase();
      return {
        state: this.cityToStateMap.get(matchedLower) || '',
        city,
        postcodes: this.cityToPostcodesMap.get(matchedLower) || []
      };
    });

    const found = Boolean(results.length);
    const result: CitySearchResult = found
      ? { found: true, results }
      : { found: false };
    this.citySearchCache.set(cacheKey, result);
    return result;
  };

  private findCitiesByCityNameArr = (
    cityNameArr: string[],
    isExactMatch: boolean
  ): CitySearchResult => {
    const results: IndividualCityResult[] = [];

    cityNameArr.forEach(cityName => {
      if (isExactMatch) {
        const { found, state, city, postcodes } =
          this.findFirstExactCity(cityName);
        if (found && state && city && postcodes)
          results.push({ state, city, postcodes });
      } else {
        const { found, results: subResults } =
          this.findPartialMatchedCities(cityName);
        if (found && subResults) results.push(...subResults);
      }
    });

    const found = Boolean(results.length);
    return found ? { found, results } : { found: false };
  };

  private findFirstExactPostcode = (postcode: string): PostcodeSearchResult => {
    // Check cache
    const cacheKey = `${postcode}:${true}`;
    if (this.postcodeSearchCache.has(cacheKey)) {
      return this.postcodeSearchCache.get(cacheKey)!;
    }

    // O(1) exact lookup
    const location = this.postcodeToLocationMap.get(postcode);

    const result: PostcodeSearchResult = location
      ? { found: true, ...location, postcode }
      : { found: false };

    this.postcodeSearchCache.set(cacheKey, result);
    return result;
  };

  private findPartialMatchedPostcode = (
    postcode: string
  ): PostcodeSearchResult => {
    // Partial matching
    // Check cache
    const cacheKey = `${postcode}:${false}`;
    if (this.postcodeSearchCache.has(cacheKey)) {
      return this.postcodeSearchCache.get(cacheKey)!;
    }

    const matchedPostcode = this.allPostcodesList.filter(pc =>
      pc.includes(postcode)
    );

    const results = matchedPostcode.map(postcode => {
      const location = this.postcodeToLocationMap.get(postcode);
      if (!location) throw new Error('Missing location'); // Could be refactored again
      return {
        ...location,
        postcode
      };
    });

    const found = Boolean(results.length);
    const result: PostcodeSearchResult = found
      ? { found: true, results }
      : { found: false };

    this.postcodeSearchCache.set(cacheKey, result);
    return result;
  };

  private findPostcodeByPostcodeArr = (
    postcodeArr: string[],
    isExactMatch: boolean
  ): PostcodeSearchResult => {
    const results: { state: string; city: string; postcode: string }[] = [];

    postcodeArr.forEach(postcode => {
      if (isExactMatch) {
        const {
          found,
          state,
          city,
          postcode: pc
        } = this.findFirstExactPostcode(postcode);
        if (found && state && city && pc)
          results.push({ state, city, postcode: pc });
      } else {
        const { found, results: subResults } =
          this.findPartialMatchedPostcode(postcode);
        if (found && subResults) results.push(...subResults);
      }
    });

    const found = Boolean(results.length);
    return found ? { found, results } : { found: false };
  };

  getStates(): string[] {
    return this.allStateNames;
  }

  getCities(selectedState: string | null): string[] {
    if (!selectedState) return [];

    const stateLower = selectedState.toLowerCase();
    return this.stateToQcitiresMap.get(stateLower) || [];
  }

  findCities(
    cityName: string | string[] | null,
    isExactMatch: boolean = true
  ): CitySearchResult {
    if (!cityName) return { found: false };

    if (isExactMatch !== false) isExactMatch = true;

    if (Array.isArray(cityName)) {
      return this.findCitiesByCityNameArr(cityName, isExactMatch);
    }

    if (isExactMatch) return this.findFirstExactCity(cityName);

    return this.findPartialMatchedCities(cityName);
  }

  getPostcodes(state: string | null, city: string | null): string[] {
    if (!state || !city) return [];

    const stateLower = state.toLowerCase();
    const cityLower = city.toLowerCase();

    // First validate that the state exists
    const stateData = this.stateMap.get(stateLower);
    if (!stateData) return [];

    // Then check if the city belongs to this specific state
    const cityState = this.cityToStateMap.get(cityLower);
    if (cityState?.toLowerCase() !== stateLower) return [];

    // Return postcodes for the city
    return this.cityToPostcodesMap.get(cityLower) || [];
  }

  findPostcode(
    postcode: string | string[] | null,
    isExactMatch: boolean = true
  ): PostcodeSearchResult {
    if (!postcode) return { found: false };

    if (isExactMatch !== false) isExactMatch = true;

    if (Array.isArray(postcode)) {
      return this.findPostcodeByPostcodeArr(postcode, isExactMatch);
    }

    if (isExactMatch) return this.findFirstExactPostcode(postcode);

    return this.findPartialMatchedPostcode(postcode);
  }

  getPostcodesByPrefix(prefix: string | null): string[] {
    if (!prefix || prefix.length < 1 || prefix.length > 5) {
      return [];
    }

    // Check cache
    if (this.prefixCache.has(prefix)) {
      return this.prefixCache.get(prefix)!;
    }

    // Use trie for O(prefix.length) lookup
    let current = this.postcodeTrie;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        const result: string[] = [];
        this.prefixCache.set(prefix, result);
        return result;
      }
      current = current.children.get(char)!;
    }

    const result = Array.from(current.postcodes);
    this.prefixCache.set(prefix, result);
    return result;
  }

  searchAll(query: string | null): SearchAllResult {
    if (!query || query.trim().length === 0) {
      return { found: false, states: [], cities: [], postcodes: [] };
    }

    // Check cache first for ultra-fast lookup
    if (this.searchAllCache.has(query)) {
      return this.searchAllCache.get(query)!;
    }

    const queryLower = query.toLowerCase().trim();
    const states: string[] = [];
    const cities: IndividualCityResult[] = [];
    const postcodes: { state: string; city: string; postcode: string }[] = [];

    // Search states - optimized with Set
    for (const stateName of this.allStateNames) {
      if (stateName.toLowerCase().includes(queryLower)) {
        states.push(stateName);
      }
    }

    // Search cities
    const cityResults = this.findCities(query, false);
    if (cityResults.found && cityResults.results) {
      cities.push(...cityResults.results);
    }

    // Search postcodes
    const postcodeResults = this.findPostcode(query, false);
    if (postcodeResults.found && postcodeResults.results) {
      postcodes.push(...postcodeResults.results);
    }

    const hasResults = Boolean(
      states.length || cities.length || postcodes.length
    );
    const result = { found: hasResults, states, cities, postcodes };

    // Cache the result for future ultra-fast access
    this.manageCacheSize(this.searchAllCache);
    this.searchAllCache.set(query, result);
    return result;
  }

  getRandomPostcode(): string {
    const randomIndex = Math.floor(
      Math.random() * this.allPostcodesList.length
    );
    return this.allPostcodesList[randomIndex];
  }

  getRandomCity(stateName?: string | null): string {
    if (stateName) {
      const cities = this.getCities(stateName);
      if (cities.length === 0) return '';
      const randomIndex = Math.floor(Math.random() * cities.length);
      return cities[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * this.allCityNames.length);
      return this.allCityNames[randomIndex];
    }
  }

  getRandomState(): string {
    const randomIndex = Math.floor(Math.random() * this.allStateNames.length);
    return this.allStateNames[randomIndex];
  }
}

// Initialize optimized data structure
const optimizedData = new OptimizedDataStructure(data.state);

export const allPostcodes: State[] = data.state;

/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
export const getStates = (): string[] => {
  return optimizedData.getStates();
};

/**
 * Gets all cities for a given state.
 * @param selectedState - The name of the state for which cities are to be retrieved.
 * @returns Array containing names of cities for the selected state. Empty array if the state is not found.
 */
export const getCities = (selectedState: string | null): string[] => {
  return optimizedData.getCities(selectedState);
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
  return optimizedData.findCities(cityName, isExactMatch);
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
  return optimizedData.getPostcodes(state, city);
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
  return optimizedData.findPostcode(postcode, isExactMatch);
};

/**
 * This function returns an array of postcodes that match the given prefix.
 * The prefix should be between 1 and 5 characters long.
 *
 * @param prefix - The prefix to match against the postcodes
 * @returns An array of matching postcodes
 */
export const getPostcodesByPrefix = (prefix: string | null): string[] => {
  return optimizedData.getPostcodesByPrefix(prefix);
};

/**
 * Universal search function that searches across states, cities, and postcodes.
 * @param query - The search query to match against states, cities, or postcodes.
 * @returns An object containing matched states, cities, and postcodes.
 */
export const searchAll = (query: string | null): SearchAllResult => {
  return optimizedData.searchAll(query);
};

/**
 * Returns a random valid postcode from the dataset.
 * @returns A random postcode string.
 */
export const getRandomPostcode = (): string => {
  return optimizedData.getRandomPostcode();
};

/**
 * Returns a random city name from the dataset.
 * @param stateName - Optional state name to get random city from specific state.
 * @returns A random city name string.
 */
export const getRandomCity = (stateName?: string | null): string => {
  return optimizedData.getRandomCity(stateName);
};

/**
 * Returns a random state name from the dataset.
 * @returns A random state name string.
 */
export const getRandomState = (): string => {
  return optimizedData.getRandomState();
};
