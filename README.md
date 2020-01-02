# Malaysia Postcodes

List of Malaysia Postcodes with City and State (JSON)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [allPostcodes](#allPostcodes)
  - [getStates](#getStates)
  - [getCities](#getCities)
  - [getPostcodes](#getPostcodes)
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
  getPostcodes
} from "malaysia-postcodes";
```

## Usage

### allPostcodes

Return all postcodes with city and state data

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

```js
const postcodes = allPostcodes;
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
  "Wp Putrajaya"
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
  "Wakaf Bharu"
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
  "17070"
];
```

## License

MIT. See [LICENSE](LICENSE) for more details.
