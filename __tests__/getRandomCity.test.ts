import { getCities, getRandomCity, getStates } from '../src';

describe('getRandomCity', () => {
  it('should be defined', () => {
    expect(getRandomCity).toBeDefined();
  });

  it('should return a valid city string when no state specified', () => {
    const randomCity = getRandomCity();

    expect(typeof randomCity).toBe('string');
    expect(randomCity.length).toBeGreaterThan(0);
  });

  it('should return a city from the specified state', () => {
    const stateName = 'Selangor';
    const citiesInState = getCities(stateName);
    const randomCity = getRandomCity(stateName);

    expect(citiesInState).toContain(randomCity);
  });

  it('should return empty string for invalid state', () => {
    const randomCity = getRandomCity('InvalidStateName');

    expect(randomCity).toBe('');
  });

  it('should return different cities on multiple calls', () => {
    const cities = new Set();

    for (let i = 0; i < 10; i++) {
      cities.add(getRandomCity());
    }

    expect(cities.size).toBeGreaterThan(1);
  });

  it('should work with null state parameter', () => {
    const randomCity = getRandomCity(null);

    expect(typeof randomCity).toBe('string');
    expect(randomCity.length).toBeGreaterThan(0);
  });

  it('should work with case insensitive state names', () => {
    const stateName = 'SELANGOR';
    const citiesInState = getCities('Selangor');
    const randomCity = getRandomCity(stateName);

    expect(citiesInState).toContain(randomCity);
  });

  it('should return cities from different states when no state specified', () => {
    const cities = new Set();
    const states = getStates();

    for (let i = 0; i < 20; i++) {
      const city = getRandomCity();
      cities.add(city);
    }

    const statesWithCities = new Set();
    states.forEach(state => {
      const citiesInState = getCities(state);
      cities.forEach(city => {
        if (citiesInState.includes(city as string)) {
          statesWithCities.add(state);
        }
      });
    });

    expect(statesWithCities.size).toBeGreaterThan(1);
  });
});
