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
  // Array (not Set) so postcodes shared by multiple cities are preserved
  // in data order, matching the original implementation.
  postcodes: string[] = [];
}

// Preprocessed data structures for O(1) lookups
class OptimizedDataStructure {
  private stateMap: Map<string, State>;
  private stateToCitiesMap: Map<string, string[]>;
  // Keyed by lowercased city name -> every occurrence across states,
  // so duplicate city names (e.g. "Ayer Hitam" in Johor & Kedah) survive.
  private cityIndex: Map<string, IndividualCityResult[]>;
  // First occurrence per postcode, matching the original early-return.
  private postcodeExactMap: Map<string, { state: string; city: string }>;
  // Flat, data-ordered lists used for partial matching (preserve order + dups).
  private allCitiesFlat: IndividualCityResult[];
  private allPostcodesFlat: { state: string; city: string; postcode: string }[];
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
    this.stateToCitiesMap = new Map();
    this.cityIndex = new Map();
    this.postcodeExactMap = new Map();
    this.allCitiesFlat = [];
    this.allPostcodesFlat = [];
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
        const entry: IndividualCityResult = {
          state: state.name,
          city: city.name,
          postcodes: city.postcode
        };

        // Index every occurrence so duplicate city names across states
        // are not overwritten.
        const existing = this.cityIndex.get(cityLower);
        if (existing) {
          existing.push(entry);
        } else {
          this.cityIndex.set(cityLower, [entry]);
        }

        this.allCitiesFlat.push(entry);
        this.allCityNames.push(city.name);
        citiesInState.push(city.name);

        // Build postcode mappings and trie
        for (const postcode of city.postcode) {
          // Keep only the first occurrence for exact lookups so the result
          // matches the original "return first match" behaviour.
          if (!this.postcodeExactMap.has(postcode)) {
            this.postcodeExactMap.set(postcode, {
              state: state.name,
              city: city.name
            });
          }

          this.allPostcodesFlat.push({
            state: state.name,
            city: city.name,
            postcode
          });
          this.allPostcodesList.push(postcode);

          // Build trie for prefix matching
          this.insertIntoTrie(postcode);
        }
      }

      this.stateToCitiesMap.set(stateLower, citiesInState);
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
      current.postcodes.push(postcode);
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
    // Return a copy so callers can't mutate the internal list.
    return [...this.allStateNames];
  }

  getCities(selectedState: string | null): string[] {
    if (!selectedState) return [];

    const cities = this.stateToCitiesMap.get(selectedState.toLowerCase());
    return cities ? [...cities] : [];
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

    const cityLower = cityName.toLowerCase();

    if (isExactMatch) {
      // Exact lookup is already O(1) via the city index, so there is no
      // need to cache it. First occurrence matches the original behaviour.
      const entries = this.cityIndex.get(cityLower);
      if (entries && entries.length > 0) {
        const first = entries[0];
        return {
          found: true,
          state: first.state,
          city: first.city,
          postcodes: first.postcodes
        };
      }
      return { found: false };
    }

    // Partial matching scans every city, so cache the result keyed by the
    // normalised query. A flat, data-ordered list preserves the original
    // ordering and any duplicate city names across states.
    const cached = this.citySearchCache.get(cityLower);
    if (cached) {
      return cached;
    }

    const results: IndividualCityResult[] = [];
    for (const entry of this.allCitiesFlat) {
      if (entry.city.toLowerCase().includes(cityLower)) {
        results.push(entry);
      }
    }

    const result: CitySearchResult =
      results.length > 0 ? { found: true, results } : { found: false };
    this.manageCacheSize(this.citySearchCache);
    this.citySearchCache.set(cityLower, result);
    return result;
  }

  getPostcodes(state: string | null, city: string | null): string[] {
    if (!state || !city) return [];

    const stateLower = state.toLowerCase();

    // First validate that the state exists
    if (!this.stateMap.has(stateLower)) return [];

    // Find the occurrence of this city that belongs to the given state,
    // so duplicate city names resolve to the correct state's postcodes.
    const entries = this.cityIndex.get(city.toLowerCase());
    if (!entries) return [];

    const match = entries.find(e => e.state.toLowerCase() === stateLower);
    return match ? match.postcodes : [];
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

    if (isExactMatch) {
      // Exact lookup is already O(1) via the postcode index (first
      // occurrence), so there is no need to cache it.
      const location = this.postcodeExactMap.get(postcode);
      if (location) {
        return {
          found: true,
          state: location.state,
          city: location.city,
          postcode: postcode
        };
      }
      return { found: false };
    }

    // Partial matching scans every postcode, so cache it keyed by the query.
    // A flat, data-ordered list preserves the original ordering and any
    // postcodes shared by multiple cities.
    const cached = this.postcodeSearchCache.get(postcode);
    if (cached) {
      return cached;
    }

    const matches: { state: string; city: string; postcode: string }[] = [];
    for (const entry of this.allPostcodesFlat) {
      if (entry.postcode.includes(postcode)) {
        matches.push(entry);
      }
    }

    const result: PostcodeSearchResult =
      matches.length > 0 ? { found: true, results: matches } : { found: false };
    this.manageCacheSize(this.postcodeSearchCache);
    this.postcodeSearchCache.set(postcode, result);
    return result;
  }

  getPostcodesByPrefix(prefix: string | null): string[] {
    if (!prefix || prefix.length < 1 || prefix.length > 5) {
      return [];
    }

    // Check cache (return a copy so callers can't mutate the cached array).
    const cached = this.prefixCache.get(prefix);
    if (cached) {
      return [...cached];
    }

    // Use trie for O(prefix.length) lookup
    let current = this.postcodeTrie;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        this.manageCacheSize(this.prefixCache);
        this.prefixCache.set(prefix, []);
        return [];
      }
      current = current.children.get(char)!;
    }

    this.manageCacheSize(this.prefixCache);
    this.prefixCache.set(prefix, current.postcodes);
    return [...current.postcodes];
  }

  searchAll(query: string | null): SearchAllResult {
    if (!query || query.trim().length === 0) {
      return { found: false, states: [], cities: [], postcodes: [] };
    }

    const queryLower = query.toLowerCase().trim();

    // Check cache first (keyed by the normalised query for a better hit rate).
    const cachedSearch = this.searchAllCache.get(queryLower);
    if (cachedSearch) {
      return cachedSearch;
    }
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
    this.searchAllCache.set(queryLower, result);
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
