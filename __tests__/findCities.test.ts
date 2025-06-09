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

  it('should handle array of city names with exact match', () => {
    const cities = ['Pasir Mas', 'Kuala Lumpur'];
    const result = findCities(cities, true);

    expect(result.found).toBe(true);
    expect(result.results).toBeDefined();
    expect(result.results!.length).toBe(2);
    expect(result.results![0].city).toBe('Pasir Mas');
    expect(result.results![1].city).toBe('Kuala Lumpur');
  });

  it('should handle array of city names with some invalid entries', () => {
    const cities = ['Pasir Mas', 'NonExistentCity', 'Kuala Lumpur'];
    const result = findCities(cities, true);

    expect(result.found).toBe(true);
    expect(result.results).toBeDefined();
    expect(result.results!.length).toBe(2);
  });

  it('should return { found: false } for array of all invalid cities', () => {
    const cities = ['NonExistentCity1', 'NonExistentCity2'];
    const result = findCities(cities, true);

    expect(result).toEqual({ found: false });
  });

  it('should handle empty array', () => {
    const cities: string[] = [];
    const result = findCities(cities, true);

    expect(result).toEqual({ found: false });
  });

  it('should handle array with non-exact search', () => {
    const cities = ['Kota', 'Shah'];
    const result = findCities(cities, false);

    expect(result.found).toBe(true);
    expect(result.results).toBeDefined();
    expect(result.results!.length).toBeGreaterThan(0);
  });
});
