const data = require("./data.json");
const allPostcodes = data.state;

// get all available states
const getStates = () => {
  let states = [];

  allPostcodes.map(state => {
    states.push(state.name);

    return null;
  });

  return states;
};

// get all avaialable city based on state
const getCities = state => {
  let cities = [];

  allPostcodes.filter(stateFilter => {
    if (stateFilter.name.toLowerCase() === state.toLowerCase()) {
      const city = stateFilter.city;

      city.map(cityFilter => {
        cities.push(cityFilter.name);

        return null;
      });
    }
    return null;
  });

  return cities;
};

// get all availabel postcodes based on city and state
const getPostcodes = (state, city) => {
  let postcodes = [];

  allPostcodes.filter(stateFilter => {
    if (stateFilter.name.toLowerCase() === state.toLowerCase()) {
      const cities = stateFilter.city;

      cities.filter(cityFilter => {
        if (cityFilter.name.toLowerCase() === city.toLowerCase()) {
          postcodes = cityFilter.postcode;
        }

        return null;
      });
    }
    return null;
  });

  return postcodes;
};

// find state and city based on postcode
const findPostcode = postcode => {
  let result = {
    found: false
  };

  allPostcodes.filter(state => {
    state.city.map(city => {
      if (city.postcode.includes(postcode)) {
        result.found = true;
        result.state = state.name;
        result.city = city.name;
      }
      return null;
    });
    return null;
  });

  return result;
};

// exports all variable and function
module.exports.allPostcodes = allPostcodes;
module.exports.getStates = getStates;
module.exports.getCities = getCities;
module.exports.getPostcodes = getPostcodes;
module.exports.findPostcode = findPostcode;
