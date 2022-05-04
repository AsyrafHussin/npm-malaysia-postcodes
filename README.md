# Malaysia Postcodes

List of Malaysia Postcodes with City and State (JSON)

[![Version](https://img.shields.io/npm/v/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![Downloads/week](https://img.shields.io/npm/dw/malaysia-postcodes.svg)](https://npmjs.org/package/malaysia-postcodes)
[![NPM monthly downloads](https://img.shields.io/npm/dm/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![NPM total downloads](https://img.shields.io/npm/dt/malaysia-postcodes.svg?style=flat)](https://www.npmjs.com/package/malaysia-postcodes)
[![License](https://img.shields.io/npm/l/malaysia-postcodes.svg)](https://github.com/AsyrafHussin/malaysia-postcodes/blob/master/package.json)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [allPostcodes](#allPostcodes)
  - [getStates](#getStates)
  - [getCities](#getCities)
  - [getPostcodes](#getPostcodes)
  - [findPostcode](#findPostcode)
- [License](#license)

## Installation

Install the package from NPM.

```bash
npm i malaysia-postcodes
```

Include it in your script.

```js
import {
  allPostcodes,
  getStates,
  getCities,
  getPostcodes,
  findPostcode,
} from "malaysia-postcodes";
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

###

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

## Contributing

If you spot any errors, typos or missing information, please submit a pull request.

## License

ISC. See [LICENSE](LICENSE) for more details.
