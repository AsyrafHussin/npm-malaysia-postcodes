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
export declare const allPostcodes: State[];
/**
 * Retrieves the list of all states.
 * @returns {Array} Array containing names of all states.
 */
export declare const getStates: () => string[];
/**
 * Gets all cities for a given state.
 * @param selectedState - The name of the state for which cities are to be retrieved.
 * @returns Array containing names of cities for the selected state. Empty array if the state is not found.
 */
export declare const getCities: (selectedState: string | null) => string[];
/**
 * Finds the states and their postcodes based on a city name or partial city name.
 * @param cityName - The name or partial name of the city to search for.
 * @param isExactMatch - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export declare const findCities: (cityName: string | null, isExactMatch?: boolean) => CitySearchResult;
/**
 * Retrieves all postcodes for a given state and city.
 * @param {string} state - The name of the state.
 * @param {string} city - The name of the city.
 * @returns {Array} Array containing postcodes for the selected state and city. Empty array if not found.
 */
export declare const getPostcodes: (state: string | null, city: string | null) => string[];
/**
 * Finds the state and city based on a given postcode.
 * @param {string} postcode - The postcode to search for.
 * @param {boolean} [isExactMatch] - Determines if the search should be exact (true) or "like" pattern (false).
 * @returns {Object} An object with 'found', and if matches are found in the case of non-exact searches, a 'results' property containing an array of matched postcodes.
 */
export declare const findPostcode: (postcode: string | null, isExactMatch?: boolean) => PostcodeSearchResult;
