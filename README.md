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
  - [getPostcodes](#getpostcodes)
  - [findPostcode](#findpostcode)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

### NPM

Install the package from NPM.

```bash
npm i malaysia-postcodes
```

### CDN via jsDelivr

```html
<!-- Regular version -->
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@1.2.0/dist/malaysia-postcodes.js"></script>

<!-- Minified version -->
<script src="https://cdn.jsdelivr.net/npm/malaysia-postcodes@1.2.0/dist/malaysia-postcodes.min.js"></script>
```

## Imports

### ES6 Imports

If you're using a module bundler like Webpack:

```js
import {
  allPostcodes,
  getStates,
  getCities,
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

Example usage

```js
const postcodes = allPostcodes;
```

Example results

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

Example usage

```js
const states = getStates();
```

Example results

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

Example usage

```js
const cities = getCities("Kelantan");
```

Example results

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

### getPostcodes

Return all postcodes data based on selected state and city

Example usage

```js
const postcodes = getPostcodes("Kelantan", "Pasir Mas");
```

Example results

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

### findPostcode

Return state and city data based on postcode

Example usage

```js
const location = findPostcode("17070");
```

Example result if postcode found

```js
{
  "found": true,
  "state": "Kelantan",
  "city": "Pasir Mas"
}
```

Example result if postcode not found

```js
{
  "found": false
}
```

## TypeScript Support

Starting from version 1.1.0, malaysia-postcodes provides TypeScript type declarations out-of-the-box. This enhancement ensures a more developer-friendly experience for TypeScript users, offering better intellisense and type checking without requiring any additional installation steps.

For JavaScript users, this change won't affect your current implementation, and you can continue using the package as before.

## Contributing

If you spot any errors, typos or missing information, please submit a pull request.

## License

ISC. See [LICENSE](LICENSE) for more details.
