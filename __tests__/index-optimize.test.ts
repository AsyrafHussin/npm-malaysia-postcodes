import data from '../src/data.json';
import * as original from '../src/index';
import * as optimized from '../src/index-optimize';

/**
 * The optimized implementation must stay 100% functionally compatible with
 * the reference implementation in `src/index.ts`. These tests assert parity
 * across exhaustive inputs and guard the bugs that were previously present:
 *   - duplicate city names across states being collapsed
 *   - duplicate postcodes / ordering changes in prefix and partial searches
 *   - internal arrays leaking by reference (mutation safety)
 */

const allCityNames = Array.from(
  new Set(data.state.flatMap(s => s.city.map(c => c.name)))
);
const allPostcodes = Array.from(
  new Set(data.state.flatMap(s => s.city.flatMap(c => c.postcode)))
);

// City names that exist in more than one state — the key regression area.
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

describe('index-optimize parity with index', () => {
  it('has at least one duplicate city name to exercise the regression', () => {
    expect(duplicateCityNames.length).toBeGreaterThan(0);
  });

  it('getStates matches', () => {
    expect(optimized.getStates()).toEqual(original.getStates());
  });

  it('getCities matches for every state', () => {
    for (const s of data.state) {
      expect(optimized.getCities(s.name)).toEqual(original.getCities(s.name));
    }
  });

  it('getPostcodes matches for every state/city pair', () => {
    for (const s of data.state) {
      for (const c of s.city) {
        expect(optimized.getPostcodes(s.name, c.name)).toEqual(
          original.getPostcodes(s.name, c.name)
        );
      }
    }
  });

  it('findCities (exact and partial) matches for every city name', () => {
    for (const name of allCityNames) {
      expect(optimized.findCities(name)).toEqual(original.findCities(name));
      expect(optimized.findCities(name, false)).toEqual(
        original.findCities(name, false)
      );
    }
  });

  it('findPostcode (exact) matches for every postcode', () => {
    for (const pc of allPostcodes) {
      expect(optimized.findPostcode(pc)).toEqual(original.findPostcode(pc));
    }
  });

  it('partial / prefix / searchAll match for many query fragments', () => {
    const fragments = [
      '1',
      '5',
      '8',
      '0',
      '50',
      '84',
      '86',
      '11',
      '40',
      '93',
      '100',
      '999',
      'Kuala',
      'Bandar',
      'Sungai',
      'Ayer',
      'xyz'
    ];
    for (const q of fragments) {
      expect(optimized.getPostcodesByPrefix(q)).toEqual(
        original.getPostcodesByPrefix(q)
      );
      expect(optimized.findPostcode(q, false)).toEqual(
        original.findPostcode(q, false)
      );
      expect(optimized.findCities(q, false)).toEqual(
        original.findCities(q, false)
      );
      expect(optimized.searchAll(q)).toEqual(original.searchAll(q));
    }
  });

  it('array inputs match', () => {
    expect(optimized.findCities(['Ayer Hitam', 'Serdang'])).toEqual(
      original.findCities(['Ayer Hitam', 'Serdang'])
    );
    expect(optimized.findPostcode(['50100', '86100', '06150'])).toEqual(
      original.findPostcode(['50100', '86100', '06150'])
    );
  });
});

describe('index-optimize duplicate city names', () => {
  it('resolves each duplicate city to the correct state in getPostcodes', () => {
    for (const lowerName of duplicateCityNames) {
      for (const s of data.state) {
        const city = s.city.find(c => c.name.toLowerCase() === lowerName);
        if (!city) continue;
        expect(optimized.getPostcodes(s.name, city.name)).toEqual(
          city.postcode
        );
      }
    }
  });

  it('findCities partial returns every state a duplicate city appears in', () => {
    for (const lowerName of duplicateCityNames) {
      const result = optimized.findCities(lowerName, false);
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
});

describe('index-optimize mutation safety', () => {
  it('getStates returns a fresh array', () => {
    const before = optimized.getStates().length;
    optimized.getStates().push('HACKED');
    expect(optimized.getStates()).toHaveLength(before);
  });

  it('getCities returns a fresh array', () => {
    const before = optimized.getCities('Johor').length;
    optimized.getCities('Johor').push('HACKED');
    expect(optimized.getCities('Johor')).toHaveLength(before);
  });

  it('getPostcodesByPrefix returns a fresh array', () => {
    const before = optimized.getPostcodesByPrefix('50').length;
    optimized.getPostcodesByPrefix('50').push('HACKED');
    expect(optimized.getPostcodesByPrefix('50')).toHaveLength(before);
  });
});
