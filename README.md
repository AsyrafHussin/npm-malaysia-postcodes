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

Example

```js
const postcodes = allPostcodes;
```

### getStates

Return all states data

Example

```js
const states = getStates();
```

### getCities

Return all cities data based on selected state

Example

```js
const cities = getCities("Kelantan");
```

###

### getPostcodes

Return all postcodes data based on selected state and city

Example

```js
const postcodes = getPostcodes("Kelantan", "Pasir Mas");
```

## License

MIT. See [LICENSE](LICENSE) for more details.
