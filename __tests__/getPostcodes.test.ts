import { getPostcodes } from '../src';

describe('getPostcodes', () => {
  it('should be defined', () => {
    expect(getPostcodes).toBeDefined();
  });

  it('should return an array for valid inputs', () => {
    const exampleState = 'Johor';
    const exampleCity = 'Johor Bahru';
    expect(Array.isArray(getPostcodes(exampleState, exampleCity))).toBe(true);
  });

  it('should return correct postcodes for a given state and city', () => {
    const exampleState = 'Johor';
    const exampleCity = 'Johor Bahru';
    const expectedPostcodes = ['80000', '80100'];
    const postcodes = getPostcodes(exampleState, exampleCity);
    expectedPostcodes.forEach(postcode => {
      expect(postcodes).toContain(postcode);
    });
  });

  it('should handle invalid cities appropriately', () => {
    const validState = 'Johor';
    const invalidCity = 'InvalidCity';
    const response = getPostcodes(validState, invalidCity);
    expect(response).toEqual([]);
  });

  it('should handle invalid states appropriately', () => {
    const invalidState = 'InvalidState';
    const exampleCity = 'Johor Bahru';
    const response = getPostcodes(invalidState, exampleCity);

    expect(response).toEqual([]);
  });

  it('should return an empty array when the state is null', () => {
    const result = getPostcodes(null, 'Some City');
    expect(result).toEqual([]);
  });

  it('should return an empty array when the state is an empty string', () => {
    const result = getPostcodes('', 'Some City');
    expect(result).toEqual([]);
  });

  it('should return an empty array when the city is null', () => {
    const result = getPostcodes('Some State', null);
    expect(result).toEqual([]);
  });

  it('should return an empty array when the city is an empty string', () => {
    const result = getPostcodes('Some State', '');
    expect(result).toEqual([]);
  });
});
