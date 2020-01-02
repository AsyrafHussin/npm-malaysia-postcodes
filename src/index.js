const allPostcodes = require("./data.json");

// get all available states
const getStates = () => {
  let states = [];

  allPostcodes.map(state => {
    states.push(state.name);
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
      });
    }
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
        if (city.filter.toLowerCase() === city.toLowerCase()) {
          cityFilter.map(postcode => {
            postcodes.push(postcode);
          });
        }
      });
    }
  });

  return postcodes;
};

// exports allvariable and function
module.exports.allPostcodes = allPostcodes;
module.exports.getStates = getStates;
module.exports.getCities = getCities;
module.exports.getPostcodes = getPostcodes;
