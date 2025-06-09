interface City {
    name: string;
    postcode: string[];
}
interface State {
    name: string;
    city: City[];
}
interface IndividualCityResult {
    state: string;
    city: string;
    postcodes: string[];
}
interface CitySearchResult {
    found: boolean;
    results?: IndividualCityResult[];
    state?: string;
    city?: string;
    postcodes?: string[];
}
interface PostcodeSearchResult {
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
interface SearchAllResult {
    found: boolean;
    states: string[];
    cities: IndividualCityResult[];
    postcodes: {
        state: string;
        city: string;
        postcode: string;
    }[];
}
declare const allPostcodes: State[];
/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
declare const getStates: () => string[];
/**
 * Gets all cities for a given state.
 * @param selectedState - The name of the state for which cities are to be retrieved.
 * @returns Array containing names of cities for the selected state. Empty array if the state is not found.
 */
declare const getCities: (selectedState: string | null) => string[];
/**
 * Finds the states and their postcodes based on a city name or partial city name.
 * @param cityName - The name or partial name of the city to search for, or an array of city names.
 * @param isExactMatch - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
declare const findCities: (cityName: string | string[] | null, isExactMatch?: boolean) => CitySearchResult;
/**
 * Retrieves all postcodes for a given state and city.
 * @param {string} state - The name of the state.
 * @param {string} city - The name of the city.
 * @returns {Array} Array containing postcodes for the selected state and city. Empty array if not found.
 */
declare const getPostcodes: (state: string | null, city: string | null) => string[];
/**
 * Finds the state and city based on a given postcode or array of postcodes.
 * @param {string | string[]} postcode - The postcode(s) to search for.
 * @param {boolean} [isExactMatch] - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns {Object} An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
declare const findPostcode: (postcode: string | string[] | null, isExactMatch?: boolean) => PostcodeSearchResult;
/**
 * This function returns an array of postcodes that match the given prefix.
 * The prefix should be between 1 and 5 characters long.
 *
 * @param prefix - The prefix to match against the postcodes
 * @returns An array of matching postcodes
 */
declare const getPostcodesByPrefix: (prefix: string | null) => string[];
/**
 * Universal search function that searches across states, cities, and postcodes.
 * @param query - The search query to match against states, cities, or postcodes.
 * @returns An object containing matched states, cities, and postcodes.
 */
declare const searchAll: (query: string | null) => SearchAllResult;
/**
 * Returns a random valid postcode from the dataset.
 * @returns A random postcode string.
 */
declare const getRandomPostcode: () => string;
/**
 * Returns a random city name from the dataset.
 * @param stateName - Optional state name to get random city from specific state.
 * @returns A random city name string.
 */
declare const getRandomCity: (stateName?: string | null) => string;
/**
 * Returns a random state name from the dataset.
 * @returns A random state name string.
 */
declare const getRandomState: () => string;

export { type City, type CitySearchResult, type IndividualCityResult, type PostcodeSearchResult, type SearchAllResult, type State, allPostcodes, findCities, findPostcode, getCities, getPostcodes, getPostcodesByPrefix, getRandomCity, getRandomPostcode, getRandomState, getStates, searchAll };
