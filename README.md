# Malaysia Postcodes

A Comprehensive NPM Package of Malaysia Postcodes, Complete with City and State Information, available in JSON format.

[![Version](https://img.shields.io/npm/v/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![Downloads/week](https://img.shields.io/npm/dw/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![NPM monthly downloads](https://img.shields.io/npm/dm/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![NPM total downloads](https://img.shields.io/npm/dt/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![License](https://img.shields.io/npm/l/malaysia-postcodes.svg)](https://github.com/AsyrafHussin/npm-malaysia-postcodes/blob/main/package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![GitHub Workflow Status](https://github.com/AsyrafHussin/npm-malaysia-postcodes/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/AsyrafHussin/npm-malaysia-postcodes/actions)

## Overview

`malaysia-postcodes` is an npm package that provides a comprehensive list of Malaysia postcodes, along with the corresponding city and state information. It is a handy tool for developers and researchers who require postal data for Malaysia in their projects.

## Table of Contents

- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
  - [CDN via jsDelivr](#cdn-via-jsdelivr)
- [Imports](#imports)
  - [ES Modules (Recommended)](#es-modules-recommended)
  - [CommonJS](#commonjs)
  - [Script Tag](#script-tag)
    - [Destructuring](#destructuring)
    - [Direct Access](#direct-access)
- [Usage](#usage)
  - [allPostcodes](#allpostcodes)
  - [getStates](#getstates)
  - [getCities](#getcities)
  - [findCities](#findcities)
  - [getPostcodes](#getpostcodes)
  - [getPostcodesByPrefix](#getpostcodesbyprefix)
  - [findPostcode](#findpostcode)
  - [searchAll](#searchall)
  - [getRandomPostcode](#getrandompostcode)
  - [getRandomCity](#getrandomcity)
  - [getRandomState](#getrandomstate)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)
- [Testing](#testing)
  - [Running the Tests](#running-the-tests)
  - [Watch Mode](#watch-mode)
  - [Test Coverage](#test-coverage)
- [Data Source](#data-source)
- [Contributing](#contributing)
- [License](#license)

## Installation

### NPM

Install the package from NPM.

```bash
npm i malaysia-postcodes
```

### Yarn

```bash
yarn add malaysia-postcodes
```

### CDN via jsDelivr

```html
<!-- Regular version -->
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@2.5.0/dist/malaysia-postcodes.js"></script>

<!-- Minified version -->
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@2.5.0/dist/malaysia-postcodes.min.js"></script>
```

## Imports

### ES Modules (Recommended)

For modern JavaScript environments with ES module support:

```js
import {
  allPostcodes,
  getStates,
  getCities,
  findCities,
  getPostcodes,
  getPostcodesByPrefix,
  findPostcode,
  searchAll,
  getRandomPostcode,
  getRandomCity,
  getRandomState,
} from "malaysia-postcodes";
```

### CommonJS

For Node.js environments or legacy applications:

```js
const {
  allPostcodes,
  getStates,
  getCities,
  findCities,
  getPostcodes,
  getPostcodesByPrefix,
  findPostcode,
  searchAll,
  getRandomPostcode,
  getRandomCity,
  getRandomState,
} = require("malaysia-postcodes");
```

### Script Tag

Once you've included the library via the script tag, you can access its functions in two ways:

#### Destructuring

You can destructure the desired functions from `window.malaysiaPostcodes`:

```js
const { 
  allPostcodes, 
  getStates, 
  getCities, 
  findCities,
  getPostcodes,
  getPostcodesByPrefix,
  findPostcode,
  searchAll,
  getRandomPostcode,
  getRandomCity,
  getRandomState
} = window.malaysiaPostcodes;
```

#### Direct Access

Alternatively, you can call the functions directly using the `malaysiaPostcodes` object:

```js
const postcodesData = malaysiaPostcodes.allPostcodes;
const states = malaysiaPostcodes.getStates();
const cities = malaysiaPostcodes.getCities("Kelantan");
const cityResults = malaysiaPostcodes.findCities("Pasir Mas");
const postcodes = malaysiaPostcodes.getPostcodes("Kelantan", "Pasir Mas");
const prefixPostcodes = malaysiaPostcodes.getPostcodesByPrefix("170");
const location = malaysiaPostcodes.findPostcode("17070");
const searchResults = malaysiaPostcodes.searchAll("Penang");
const randomPostcode = malaysiaPostcodes.getRandomPostcode();
const randomCity = malaysiaPostcodes.getRandomCity("Selangor");
const randomState = malaysiaPostcodes.getRandomState();
```

## Usage

### allPostcodes

Return all postcodes data with city and state

Example usage:

```js
const postcodes = allPostcodes;
```

Example results:

```js
[
    {
      "name": "Kelantan",
      "city": [
        {
          "name": "Pasir Mas",
          "postcode": [
            "17000",
            "17007",
            "17009",
            "17010",
            "17020",
            "17030",
            "17040",
            "17050",
            "17060",
            "17070"
          ]
        },
        ...
      ]
    },
    ...
]
```

### getStates

Return all states data

Example usage:

```js
const states = getStates();
```

Example results:

```js
[
  "Wp Kuala Lumpur",
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Penang",
  "Perak",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Wp Labuan",
  "Wp Putrajaya",
];
```

### getCities

Return all cities data based on selected state

**Parameters:**

- `selectedState` (string): The name of the state for which cities are to be retrieved.

Example usage:

```js
const cities = getCities("Kelantan");
```

Example results:

```js
[
  "Ayer Lanas",
  "Bachok",
  "Cherang Ruku",
  "Dabong",
  "Gua Musang",
  "Jeli",
  "Kem Desa Pahlawan",
  "Ketereh",
  "Kota Bharu",
  "Kuala Balah",
  "Kuala Krai",
  "Machang",
  "Melor",
  "Pasir Mas",
  "Pasir Puteh",
  "Pulai Chondong",
  "Rantau Panjang",
  "Selising",
  "Tanah Merah",
  "Temangan",
  "Tumpat",
  "Wakaf Bharu",
];
```

### findCities

Search for cities based on the provided query string. Supports both single city names and arrays of city names for batch processing.

**Parameters:**

- **query (string | string[]):** The city name(s) or part of the city name you wish to search for. Can be a single string or an array of strings for batch processing.
- **exact (boolean, optional):** Determines the type of search. If `true`, the function will search for cities that match the query exactly. If `false`, it will search for cities that contain the query string. Default is `true`.

Example usage:

```js
// For exact search (single city)
const cityDetailsExact = findCities("Pasir Mas"); 

// For non-exact search (single city)
const cityDetailsBroad = findCities("Kota", false);

// For batch processing (multiple cities)
const multipleCities = findCities(["Pasir Mas", "Kuala Lumpur"]);
```

Example result for an exact search:

```js
{
  "found": true,
  "state": "Kelantan",
  "city": "Pasir Mas",
  "postcodes": ["17000", "17007", "17009", "17010", "17020", "17030", "17040", "17050", "17060", "17070"]
}
```

Example result for a non-exact search:

```js
{
  "found": true,
  "results": [
    {
      "state": "Kelantan",
      "city": "Kota Bharu",
      "postcodes": ["15000", "15050", "15100", ...]
    },
    {
      "state": "Sabah",
      "city": "Kota Kinabalu",
      "postcodes": ["88000", "88100", "88110", ...]
    },
    ...
  ]
}
```

Example result for batch processing:

```js
{
  "found": true,
  "results": [
    {
      "state": "Kelantan",
      "city": "Pasir Mas",
      "postcodes": ["17000", "17007", ...]
    },
    {
      "state": "Wp Kuala Lumpur",
      "city": "Kuala Lumpur",
      "postcodes": ["50000", "50050", ...]
    }
  ]
}
```

Example result if city not found:

```js
{
  "found": false
}
```

### getPostcodes

Return all postcodes data based on selected state and city

**Parameters:**

- `state` (string): The name of the state.
- `city` (string): The name of the city within the specified state.

Example usage:

```js
const postcodes = getPostcodes("Kelantan", "Pasir Mas");
```

Example results:

```js
[
  "17000",
  "17007",
  "17009",
  "17010",
  "17020",
  "17030",
  "17040",
  "17050",
  "17060",
  "17070",
];
```

### getPostcodesByPrefix

Returns an array of all postcodes that start with the given prefix

#### Use Case

Let's say you have a form where the user starts typing a postcode. As they type, you can call `getPostcodesByPrefix` to dynamically show suggestions based on what the user has typed so far.

**Parameters:**

- `prefix` (string): The prefix you wish to search for. This should be a non-null string with a length between 1 and 5.

Example usage:

```js
const postcodes = getPostcodesByPrefix("170");
```

Example results:

```js
[
 '17000',
 '17007',
 '17009',
 '17010',
 '17020',
 '17030',
 '17040',
 '17050',
 '17060',
 '17070'
];
```

### findPostcode

Return state and city data based on postcode. Supports both single postcodes and arrays of postcodes for batch processing.

**Parameters:**

- `postcode` (string | string[]): The postcode(s) you wish to search for. Can be a single string or an array of strings for batch processing.
- `exact` (boolean, optional): Determines the type of search. If `true` (default), the function will search for an exact match of the provided postcode. If `false`, it will search for postcodes that start with the given substring.

Example usage:

```js
// Single postcode exact search
const locationExact = findPostcode("17070");

// Single postcode partial search
const locationPartial = findPostcode("170", false);

// Batch processing multiple postcodes
const multipleLocations = findPostcode(["17070", "50100"]);
```

Example result for an exact match when postcode is found:

```js
{
  "found": true,
  "state": "Kelantan",
  "city": "Pasir Mas",
  "postcode": "17070",
}
```

Example result for a non-exact match:

```js
{
  "found": true,
  "results": [
    {
        "state": "Wp Kuala Lumpur", 
        "city": "Kuala Lumpur", 
        "postcode": "51700"
    },
    {
        "state": "Johor", 
        "city": "Pasir Gudang", 
        "postcode": "81700"
    },
   ...
  ]
}
```

Example result for batch processing:

```js
{
  "found": true,
  "results": [
    {
        "state": "Kelantan", 
        "city": "Pasir Mas", 
        "postcode": "17070"
    },
    {
        "state": "Selangor", 
        "city": "Shah Alam", 
        "postcode": "50100"
    }
  ]
}
```

Example result if postcode is not found:

```js
{
  "found": false
}
```

### searchAll

Universal search function that searches across states, cities, and postcodes in a single query. Supports partial matching and returns all matching results across different data types.

**Parameters:**

- `query` (string): The search query to match against states, cities, or postcodes. Supports partial matching.

**What it searches:**

- **States**: Searches state names for partial matches
- **Cities**: Searches city names for partial matches  
- **Postcodes**: Searches postcode numbers for partial matches

Example usage:

```js
// Search for a state
const stateSearch = searchAll("Penang");

// Search for cities containing a term
const citySearch = searchAll("Kota");

// Search for postcodes with specific digits
const postcodeSearch = searchAll("170");

// Search for exact postcode
const exactPostcode = searchAll("50100");

// Search anything
const universalSearch = searchAll("Kuala");
```

#### Example 1: Searching for a state name

```js
searchAll("Penang")
```

Result:

```js
{
  "found": true,
  "states": ["Penang"],
  "cities": [
    {
      "state": "Penang",
      "city": "Penang Hill", 
      "postcodes": ["11300"]
    }
  ],
  "postcodes": []
}
```

#### Example 2: Searching for cities with partial term

```js
searchAll("Kota")
```

Result:

```js
{
  "found": true,
  "states": [],
  "cities": [
    {
      "state": "Kelantan",
      "city": "Kota Bharu",
      "postcodes": ["15000", "15050", "15100", ...]
    },
    {
      "state": "Sabah", 
      "city": "Kota Kinabalu",
      "postcodes": ["88000", "88100", "88110", ...]
    },
    {
      "state": "Johor",
      "city": "Kota Tinggi", 
      "postcodes": ["81900", "81907", "81910"]
    }
  ],
  "postcodes": []
}
```

#### Example 3: Searching for postcodes with partial digits

```js
searchAll("170")
```

Result:

```js
{
  "found": true,
  "states": [],
  "cities": [],
  "postcodes": [
    {
      "state": "Kelantan",
      "city": "Pasir Mas",
      "postcode": "17000"
    },
    {
      "state": "Kelantan", 
      "city": "Pasir Mas",
      "postcode": "17070"
    },
    {
      "state": "Wp Kuala Lumpur",
      "city": "Kuala Lumpur", 
      "postcode": "51700"
    },
    {
      "state": "Selangor",
      "city": "Shah Alam",
      "postcode": "40170"
    }
  ]
}
```

#### Example 4: Mixed results (multiple types found)

```js
searchAll("Kuala")
```

Result:

```js
{
  "found": true,
  "states": ["Wp Kuala Lumpur"],
  "cities": [
    {
      "state": "Wp Kuala Lumpur",
      "city": "Kuala Lumpur",
      "postcodes": ["50000", "50050", "50100", ...]
    },
    {
      "state": "Kedah",
      "city": "Kuala Kedah", 
      "postcodes": ["06600", "06607", "06609"]
    },
    {
      "state": "Terengganu",
      "city": "Kuala Berang",
      "postcodes": ["21700", "21800", "21810", ...]
    }
  ]
}
```

#### Example 5: No matches found

```js
searchAll("xyz123")
```

Result:

```js
{
  "found": false,
  "states": [],
  "cities": [],
  "postcodes": []
}
```

**Use Cases:**

- **Search bars**: One search covers all data types
- **Auto-complete**: Get suggestions across states, cities, and postcodes
- **Data validation**: Check if input exists anywhere in Malaysia
- **Flexible lookup**: No need to know if user is searching for state, city, or postcode

### getRandomPostcode

Returns a random valid postcode from the dataset. Useful for testing and demo purposes.

Example usage:

```js
const randomPostcode = getRandomPostcode();
```

Example result:

```js
"17070"
```

### getRandomCity

Returns a random city name from the dataset. Optionally, you can specify a state to get a random city from that specific state.

**Parameters:**

- `stateName` (string, optional): The name of the state to get a random city from. If not provided, returns a random city from any state.

Example usage:

```js
// Random city from any state
const randomCity = getRandomCity();

// Random city from a specific state
const randomSelangorCity = getRandomCity("Selangor");
```

Example result:

```js
"Shah Alam"
```

If an invalid state is provided, returns an empty string:

```js
const invalidResult = getRandomCity("InvalidState");
// Returns: ""
```

### getRandomState

Returns a random state name from the dataset. Useful for testing and demo purposes.

Example usage:

```js
const randomState = getRandomState();
```

Example result:

```js
"Selangor"
```

## Examples

Here are some practical examples demonstrating how to use the library:

- [Example with ES6 imports](./examples/es6)
- [Example with React](./examples/react)
- [Example with React Select](./examples/react-select)
- [Example with Script Tag](./examples/script-tag)

## TypeScript Support

Starting from version 1.1.0, malaysia-postcodes provides TypeScript type declarations out-of-the-box. This enhancement ensures a more developer-friendly experience for TypeScript users, offering better intellisense and type checking without requiring any additional installation steps.

For JavaScript users, this change won't affect your current implementation, and you can continue using the package as before.

## Testing

The library is equipped with unit tests to ensure its functionality and reliability. We utilize the Jest testing framework for this purpose.

### Running the Tests

To run the tests, follow these steps:

1.Ensure you have all dependencies installed:

```bash
npm ci
```

2.Run the test command:

```bash
npm test
```

### Watch Mode

For active development, you can run tests in watch mode. This will continuously monitor changes in the project and run tests accordingly, providing immediate feedback.

```bash
npm run test:watch
```

### Test Coverage

We strive for a high level of test coverage to ensure the library's integrity. After running tests, you can view a detailed coverage report by navigating to the `coverage` directory in the project root.

```bash
npm run test:coverage
```

Note: The `coverage` directory is not included in the repository as it is generated on-the-fly whenever tests are run with coverage.

## Data Source

This package is built on the data from the [Malaysia Postcodes GitHub repository](https://github.com/AsyrafHussin/malaysia-postcodes). It is closely associated with and relies on the JSON data available in this repository. For the most up-to-date postcode information, refer to the original repository.

## Contributing

If you find any inaccuracies, typos, or missing data, we welcome contributions! Please feel free to open an issue or submit a pull request.

## License

This repository is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.
