// ES Modules example for Node.js
import {
  findCities,
  findPostcode,
  getCities,
  getPostcodes,
  getRandomCity,
  getRandomPostcode,
  getRandomState,
  getStates,
  searchAll
} from 'malaysia-postcodes';

console.log('🇲🇾 Malaysia Postcodes - Node.js ES Modules Example\n');

// Get all states
console.log('📍 All states:');
const states = getStates();
console.log(states.slice(0, 5), '...\n'); // Show first 5

// Get cities for a specific state
console.log('🏙️  Cities in Selangor:');
const selangorCities = getCities('Selangor');
console.log(selangorCities.slice(0, 5), '...\n'); // Show first 5

// Find a specific city
console.log('🔍 Find cities containing "Shah":');
const shahCities = findCities('Shah', false);
console.log(shahCities, '\n');

// Get postcodes for a specific area
console.log('📮 Postcodes for Shah Alam, Selangor:');
const shahAlamPostcodes = getPostcodes('Selangor', 'Shah Alam');
console.log(shahAlamPostcodes.slice(0, 5), '...\n'); // Show first 5

// Find location by postcode
console.log('📍 Location for postcode 40170:');
const location = findPostcode('40170');
console.log(location, '\n');

// Universal search
console.log('🔎 Universal search for "Kuala":');
const searchResults = searchAll('Kuala');
console.log('States found:', searchResults.states);
console.log('Cities found:', searchResults.cities.length, 'cities');
console.log('Postcodes found:', searchResults.postcodes.length, 'postcodes\n');

// Random data examples
console.log('🎲 Random data examples:');
console.log('Random postcode:', getRandomPostcode());
console.log('Random city:', getRandomCity());
console.log('Random city in Penang:', getRandomCity('Penang'));
console.log('Random state:', getRandomState()); 