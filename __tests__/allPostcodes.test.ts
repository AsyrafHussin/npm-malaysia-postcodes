import { City, State, allPostcodes } from '../src';

describe('allPostcodes', () => {
  it('should be defined', () => {
    expect(allPostcodes).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(allPostcodes)).toBe(true);
  });

  it('should contain objects with a "name" and "city" property', () => {
    allPostcodes.forEach((state: State) => {
      expect(state).toHaveProperty('name');
      expect(state).toHaveProperty('city');
    });
  });

  it('each city should have a "name" and "postcode" property', () => {
    allPostcodes.forEach((state: State) => {
      state.city.forEach((city: City) => {
        expect(city).toHaveProperty('name');
        expect(city).toHaveProperty('postcode');
      });
    });
  });

  it('should have a specific number of states', () => {
    const expectedLength = 16;
    expect(allPostcodes.length).toBe(expectedLength);
  });

  it('should include all expected states and territories', () => {
    const expectedStatesAndTerritories = [
      'Johor',
      'Kedah',
      'Kelantan',
      'Wp Kuala Lumpur',
      'Wp Labuan',
      'Melaka',
      'Negeri Sembilan',
      'Pahang',
      'Penang',
      'Perak',
      'Perlis',
      'Wp Putrajaya',
      'Sabah',
      'Sarawak',
      'Selangor',
      'Terengganu'
    ];

    const presentStates = allPostcodes.map((state: State) => state.name);
    expectedStatesAndTerritories.forEach((state: string) => {
      expect(presentStates).toContain(state);
    });
  });

  it('should not have duplicated states', () => {
    const stateNames = allPostcodes.map((state: State) => state.name);
    const uniqueStateNames = new Set(stateNames);
    expect(stateNames.length).toBe(uniqueStateNames.size);
  });

  it("each 'city' property should be an array", () => {
    allPostcodes.forEach((state: State) => {
      expect(Array.isArray(state.city)).toBe(true);
    });
  });

  it('should not have duplicated cities within a state', () => {
    allPostcodes.forEach((state: State) => {
      const cityNames = state.city.map((city: City) => city.name);
      const uniqueCityNames = new Set(cityNames);
      expect(cityNames.length).toBe(uniqueCityNames.size);
    });
  });

  it('should include specific state data', () => {
    const states = allPostcodes.map((state: State) => state.name);
    expect(states).toContain('Kelantan');
  });

  it('each state should have at least one city', () => {
    allPostcodes.forEach((state: State) => {
      expect(state.city.length).toBeGreaterThan(0);
    });
  });

  it('each city should have at least one postcode', () => {
    allPostcodes.forEach((state: State) => {
      state.city.forEach((city: City) => {
        expect(city.postcode.length).toBeGreaterThan(0);
      });
    });
  });

  it('state names should only contain valid characters', () => {
    const regex = /^[a-zA-Z\s]*$/;
    allPostcodes.forEach((state: State) => {
      expect(regex.test(state.name)).toBe(true);
    });
  });

  it('no state or city should have an empty name', () => {
    allPostcodes.forEach((state: State) => {
      expect(state.name.trim().length).not.toBe(0);
      state.city.forEach((city: City) => {
        expect(city.name.trim().length).not.toBe(0);
      });
    });
  });

  it('all postcodes should be valid numbers or number strings', () => {
    allPostcodes.forEach((state: State) => {
      state.city.forEach((city: City) => {
        city.postcode.forEach((postcode: string) => {
          expect(Number(postcode)).not.toBeNaN();
        });
      });
    });
  });

  it('should not have duplicated postcodes within a city', () => {
    allPostcodes.forEach((state: State) => {
      state.city.forEach((city: City) => {
        const uniquePostcodes = new Set(city.postcode);
        expect(city.postcode.length).toBe(uniquePostcodes.size);
      });
    });
  });
});
