import { IndividualCityResult, findCities } from '../src';

describe('findCities function', () => {
  it("should returns valid result when searching exactly for the city 'Pasir Mas'", () => {
    const result = findCities('Pasir Mas');
    expect(result.found).toBe(true);
    expect(result.state).toBeDefined();
    expect(result.city).toBe('Pasir Mas');
    expect(result.postcodes).toBeInstanceOf(Array);
  });

  it("should returns an array of results when searching non-exactly for the term 'Kota'", () => {
    const result = findCities('Kota', false);
    expect(result.found).toBe(true);
    expect(result.results).toBeInstanceOf(Array);

    const hasKota = result.results?.some((cityObj: IndividualCityResult) =>
      cityObj.city.toLowerCase().includes('kota')
    );
    expect(hasKota).toBe(true);
  });

  it('should returns not found when searching exactly for a non-existing city', () => {
    const result = findCities('NonExistingCity');
    expect(result.found).toBe(false);
  });

  it('should returns not found when searching non-exactly for a non-existing term', () => {
    const result = findCities('NonExistingTerm', false);
    expect(result.found).toBe(false);
  });

  it('should returns not found when the city to search for is null', () => {
    const result = findCities(null);
    expect(result.found).toBe(false);
  });

  it('should returns not found when the city is null and search type is non-exact', () => {
    const result = findCities(null, false);
    expect(result.found).toBe(false);
  });

  it("should default to an exact search when 'isExactMatch' is not a boolean", () => {
    const result = findCities('Pasir Mas', 'notABoolean' as any);
    expect(result.found).toBe(true);
    expect(result.state).toBeDefined();
    expect(result.city).toBe('Pasir Mas');
    expect(result.postcodes).toBeInstanceOf(Array);
  });

  it("should default to an exact search when 'isExactMatch' is null", () => {
    const result = findCities('Pasir Mas', null as any);
    expect(result.found).toBe(true);
    expect(result.state).toBeDefined();
    expect(result.city).toBe('Pasir Mas');
    expect(result.postcodes).toBeInstanceOf(Array);
  });
});
