// CommonJS example for Node.js
const {
  getStates,
  getCities,
  findCities,
  getPostcodes,
  findPostcode,
  searchAll,
  getRandomPostcode,
  getRandomCity,
  getRandomState
} = require('malaysia-postcodes');

console.log('🇲🇾 Malaysia Postcodes - Node.js CommonJS Example\n');

// Get all states
console.log('📍 All states:');
const states = getStates();
console.log(states.slice(0, 5), '...\n'); // Show first 5

// Get cities for a specific state
console.log('🏙️  Cities in Kelantan:');
const kelantanCities = getCities('Kelantan');
console.log(kelantanCities.slice(0, 5), '...\n'); // Show first 5

// Find a specific city
console.log('🔍 Find cities containing "Kota":');
const kotaCities = findCities('Kota', false);
console.log(kotaCities, '\n');

// Get postcodes for a specific area
console.log('📮 Postcodes for Kota Bharu, Kelantan:');
const kotaBharuPostcodes = getPostcodes('Kelantan', 'Kota Bharu');
console.log(kotaBharuPostcodes.slice(0, 5), '...\n'); // Show first 5

// Find location by postcode
console.log('📍 Location for postcode 15000:');
const location = findPostcode('15000');
console.log(location, '\n');

// Universal search
console.log('🔎 Universal search for "Pulau Pinang":');
const searchResults = searchAll('Pulau Pinang');
console.log('States found:', searchResults.states);
console.log('Cities found:', searchResults.cities.length, 'cities');
console.log('Postcodes found:', searchResults.postcodes.length, 'postcodes\n');

// Random data examples
console.log('🎲 Random data examples:');
console.log('Random postcode:', getRandomPostcode());
console.log('Random city:', getRandomCity());
console.log('Random city in Johor:', getRandomCity('Johor'));
console.log('Random state:', getRandomState()); 