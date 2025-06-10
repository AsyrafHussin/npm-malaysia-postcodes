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
  private stateNameSet: Set<string>;
  private cityNameSet: Set<string>;
  private postcodeSet: Set<string>;

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
    this.stateNameSet = new Set();
    this.cityNameSet = new Set();
    this.postcodeSet = new Set();

    this.buildIndices(states);
  }

  private buildIndices(states: State[]): void {
    // Build all lookup structures
    for (const state of states) {
      const stateLower = state.name.toLowerCase();
      this.stateMap.set(stateLower, state);
      this.allStateNames.push(state.name);
      this.stateNameSet.add(stateLower);

      const citiesInState: string[] = [];

      for (const city of state.city) {
        const cityLower = city.name.toLowerCase();

        // City to state mapping
        this.cityToStateMap.set(cityLower, state.name);

        // City to postcodes mapping
        this.cityToPostcodesMap.set(cityLower, city.postcode);

        // Add to cities list
        this.allCityNames.push(city.name);
        this.cityNameSet.add(cityLower);
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
          this.postcodeSet.add(postcode);

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
    if (typeof isExactMatch !== 'boolean') {
      isExactMatch = true;
    }

    if (!cityName) {
      return { found: false };
    }

    if (Array.isArray(cityName)) {
      const allResults: IndividualCityResult[] = [];

      for (const city of cityName) {
        const result = this.findCities(city, isExactMatch);
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

    // Check cache
    const cacheKey = `${cityName}:${isExactMatch}`;
    if (this.citySearchCache.has(cacheKey)) {
      return this.citySearchCache.get(cacheKey)!;
    }

    const cityLower = cityName.toLowerCase();
    const results: IndividualCityResult[] = [];

    if (isExactMatch) {
      // O(1) exact lookup
      const stateName = this.cityToStateMap.get(cityLower);
      const postcodes = this.cityToPostcodesMap.get(cityLower);

      if (stateName && postcodes) {
        const result = {
          found: true,
          state: stateName,
          city: cityName,
          postcodes: postcodes
        };
        this.citySearchCache.set(cacheKey, result);
        return result;
      }
    } else {
      // Partial matching - still need to iterate but with optimized checks
      for (const [cityKey, stateName] of this.cityToStateMap.entries()) {
        if (cityKey.includes(cityLower)) {
          const postcodes = this.cityToPostcodesMap.get(cityKey);
          if (postcodes) {
            // Get original case city name
            const originalCityName =
              this.stateMap
                .get(this.cityToStateMap.get(cityKey)!.toLowerCase())
                ?.city.find(c => c.name.toLowerCase() === cityKey)?.name ||
              cityKey;

            results.push({
              state: stateName,
              city: originalCityName,
              postcodes: postcodes
            });
          }
        }
      }

      if (results.length > 0) {
        const result = { found: true, results };
        this.citySearchCache.set(cacheKey, result);
        return result;
      }
    }

    const result = { found: false };
    this.citySearchCache.set(cacheKey, result);
    return result;
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
    if (!cityState || cityState.toLowerCase() !== stateLower) return [];

    // Return postcodes for the city
    return this.cityToPostcodesMap.get(cityLower) || [];
  }

  findPostcode(
    postcode: string | string[] | null,
    isExactMatch: boolean = true
  ): PostcodeSearchResult {
    if (typeof isExactMatch !== 'boolean') {
      isExactMatch = true;
    }

    if (!postcode) {
      return { found: false };
    }

    if (Array.isArray(postcode)) {
      const allMatches: { state: string; city: string; postcode: string }[] =
        [];

      for (const pc of postcode) {
        const result = this.findPostcode(pc, isExactMatch);
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

    // Check cache
    const cacheKey = `${postcode}:${isExactMatch}`;
    if (this.postcodeSearchCache.has(cacheKey)) {
      return this.postcodeSearchCache.get(cacheKey)!;
    }

    if (isExactMatch) {
      // O(1) exact lookup
      const location = this.postcodeToLocationMap.get(postcode);
      if (location) {
        const result = {
          found: true,
          state: location.state,
          city: location.city,
          postcode: postcode
        };
        this.postcodeSearchCache.set(cacheKey, result);
        return result;
      }
    } else {
      // Partial matching
      const matches: { state: string; city: string; postcode: string }[] = [];

      for (const [pc, location] of this.postcodeToLocationMap.entries()) {
        if (pc.includes(postcode)) {
          matches.push({
            state: location.state,
            city: location.city,
            postcode: pc
          });
        }
      }

      if (matches.length > 0) {
        const result = { found: true, results: matches };
        this.postcodeSearchCache.set(cacheKey, result);
        return result;
      }
    }

    const result = { found: false };
    this.postcodeSearchCache.set(cacheKey, result);
    return result;
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

    const hasResults =
      states.length > 0 || cities.length > 0 || postcodes.length > 0;
    const result = hasResults
      ? { found: true, states, cities, postcodes }
      : { found: false, states: [], cities: [], postcodes: [] };

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
      if (this.allCityNames.length === 0) return '';
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
