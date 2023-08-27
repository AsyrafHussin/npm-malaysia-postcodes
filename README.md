# Malaysia Postcodes

List of Malaysia Postcodes with City and State (JSON)

[![Version](https://img.shields.io/npm/v/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![Downloads/week](https://img.shields.io/npm/dw/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![NPM monthly downloads](https://img.shields.io/npm/dm/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![NPM total downloads](https://img.shields.io/npm/dt/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![License](https://img.shields.io/npm/l/malaysia-postcodes.svg)](https://github.com/AsyrafHussin/malaysia-postcodes/blob/master/package.json)

## Table of Contents

- [Installation](#installation)
  - [NPM](#npm)
  - [Yarn](#yarn)
  - [CDN via jsDelivr](#cdn-via-jsdelivr)
- [Imports](#imports)
  - [ES6 Imports](#es6-imports)
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
- [Examples](#examples)
- [TypeScript Support](#typescript-support)
- [Testing](#testing)
  - [Running the Tests](#running-the-tests)
  - [Watch Mode](#watch-mode)
  - [Test Coverage](#test-coverage)
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
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@2.2.0/dist/malaysia-postcodes.js"></script>

<!-- Minified version -->
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@2.2.0/dist/malaysia-postcodes.min.js"></script>
```

## Imports

### ES6 Imports

If you're using a module bundler like Webpack:

```js
import {
  allPostcodes,
  getStates,
  getCities,
  findCities,
  getPostcodes,
  findPostcode,
} from "malaysia-postcodes";
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
  findPostcode 
} = window.malaysiaPostcodes;
```

#### Direct Access

Alternatively, you can call the functions directly using the `malaysiaPostcodes` object:

```js
const postcodesData = malaysiaPostcodes.allPostcodes;
const states = malaysiaPostcodes.getStates();
const cities = malaysiaPostcodes.getCities("Kelantan");
const postcodes = malaysiaPostcodes.getPostcodes("Kelantan", "Pasir Mas");
const location = malaysiaPostcodes.findPostcode("17070");
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

Search for cities based on the provided query string.

**Parameters:**

- **query (string):** The city name or part of the city name you wish to search for.
- **exact (boolean, optional):** Determines the type of search. If `true`, the function will search for cities that match the query exactly. If `false`, it will search for cities that contain the query string. Default is `true`.

Example usage:

```js
// For exact search
const cityDetailsExact = findCities("Pasir Mas"); 

// For non-exact search
const cityDetailsBroad = findCities("Kota", false);
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

Return state and city data based on postcode

**Parameters:**

- `postcode` (string): The postcode you wish to search for.
- `exact` (boolean, optional): Determines the type of search. If `true` (default), the function will search for an exact match of the provided postcode. If `false`, it will search for postcodes that start with the given substring.

Example usage:

```js
const locationExact = findPostcode("17070");
const locationPartial = findPostcode("170", false);
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

Example result if postcode is not found:

```js
{
  "found": false
}
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
npm install
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

## Contributing

If you spot any errors, typos or missing information, please submit a pull request.

## License

ISC. See [LICENSE](LICENSE) for more details.
