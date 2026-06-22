import data from '../src/data.json';
import {
  findCities,
  getCities,
  getPostcodes,
  getPostcodesByPrefix,
  getStates
} from '../src';

/**
 * Regression tests for the indexed/cached implementation:
 *   - duplicate city names across states must not collapse
 *   - array-returning getters must not leak internal state by reference
 */

// City names that exist in more than one state.
const duplicateCityNames = (() => {
  const counts = new Map<string, Set<string>>();
  for (const s of data.state) {
    for (const c of s.city) {
      const key = c.name.toLowerCase();
      if (!counts.has(key)) counts.set(key, new Set());
      counts.get(key)!.add(s.name);
    }
  }
  return [...counts.entries()]
    .filter(([, states]) => states.size > 1)
    .map(([key]) => key);
})();

describe('duplicate city names across states', () => {
  it('has at least one duplicate city name to exercise the regression', () => {
    expect(duplicateCityNames.length).toBeGreaterThan(0);
  });

  it('getPostcodes resolves each duplicate city to the correct state', () => {
    for (const lowerName of duplicateCityNames) {
      for (const s of data.state) {
        const city = s.city.find(c => c.name.toLowerCase() === lowerName);
        if (!city) continue;
        expect(getPostcodes(s.name, city.name)).toEqual(city.postcode);
      }
    }
  });

  it('findCities (partial) returns every state a duplicate city appears in', () => {
    for (const lowerName of duplicateCityNames) {
      const result = findCities(lowerName, false);
      expect(result.found).toBe(true);

      const states = result.results!.map(r => r.state);
      const expectedStates = data.state
        .filter(s => s.city.some(c => c.name.toLowerCase() === lowerName))
        .map(s => s.name);

      for (const st of expectedStates) {
        expect(states).toContain(st);
      }
    }
  });

  it('findCities (exact) returns the canonical city name, not the query input', () => {
    const result = findCities('ayer hitam');
    expect(result.found).toBe(true);
    expect(result.city).toBe('Ayer Hitam');
  });
});

describe('mutation safety', () => {
  it('getStates returns a fresh array', () => {
    const before = getStates().length;
    getStates().push('HACKED');
    expect(getStates()).toHaveLength(before);
  });

  it('getCities returns a fresh array', () => {
    const before = getCities('Johor').length;
    getCities('Johor').push('HACKED');
    expect(getCities('Johor')).toHaveLength(before);
  });

  it('getPostcodesByPrefix returns a fresh array', () => {
    const before = getPostcodesByPrefix('50').length;
    getPostcodesByPrefix('50').push('HACKED');
    expect(getPostcodesByPrefix('50')).toHaveLength(before);
  });
});
