import { searchAll } from '../src';

describe('searchAll', () => {
  it('should be defined', () => {
    expect(searchAll).toBeDefined();
  });

  it('should return { found: false } for null or empty query', () => {
    expect(searchAll(null)).toEqual({
      found: false,
      states: [],
      cities: [],
      postcodes: []
    });
    expect(searchAll('')).toEqual({
      found: false,
      states: [],
      cities: [],
      postcodes: []
    });
    expect(searchAll('   ')).toEqual({
      found: false,
      states: [],
      cities: [],
      postcodes: []
    });
  });

  it('should find states by name', () => {
    const result = searchAll('Kelantan');

    expect(result.found).toBe(true);
    expect(result.states).toContain('Kelantan');
  });

  it('should find states by partial name', () => {
    const result = searchAll('Kela');

    expect(result.found).toBe(true);
    expect(result.states).toContain('Kelantan');
  });

  it('should find cities', () => {
    const result = searchAll('Kuala Lumpur');

    expect(result.found).toBe(true);
    expect(result.cities).toBeDefined();
    expect(result.cities!.length).toBeGreaterThan(0);
    expect(result.cities![0].city).toBe('Kuala Lumpur');
  });

  it('should find postcodes', () => {
    const result = searchAll('50100');

    expect(result.found).toBe(true);
    expect(result.postcodes).toBeDefined();
    expect(result.postcodes!.length).toBeGreaterThan(0);
    expect(result.postcodes![0].postcode).toBe('50100');
  });

  it('should return multiple types of results', () => {
    const result = searchAll('Penang');

    expect(result.found).toBe(true);
    expect(result.states).toContain('Penang');
  });

  it('should return { found: false } for non-existent query', () => {
    const result = searchAll('NonExistentPlace123');

    expect(result).toEqual({
      found: false,
      states: [],
      cities: [],
      postcodes: []
    });
  });

  it('should handle case insensitive search', () => {
    const result = searchAll('KELANTAN');

    expect(result.found).toBe(true);
    expect(result.states).toContain('Kelantan');
  });

  it('should always return consistent format with all three arrays', () => {
    const result = searchAll('Penang');

    expect(result).toHaveProperty('found');
    expect(result).toHaveProperty('states');
    expect(result).toHaveProperty('cities');
    expect(result).toHaveProperty('postcodes');
    expect(Array.isArray(result.states)).toBe(true);
    expect(Array.isArray(result.cities)).toBe(true);
    expect(Array.isArray(result.postcodes)).toBe(true);
  });

  it('should return empty arrays for categories with no matches', () => {
    const result = searchAll('50100');

    expect(result.found).toBe(true);
    expect(result.states).toEqual([]);
    expect(result.cities).toEqual([]);
    expect(result.postcodes.length).toBeGreaterThan(0);
  });
});
