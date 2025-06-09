import { findPostcode, getRandomPostcode } from '../src';

describe('getRandomPostcode', () => {
  it('should be defined', () => {
    expect(getRandomPostcode).toBeDefined();
  });

  it('should return a valid postcode string', () => {
    const randomPostcode = getRandomPostcode();

    expect(typeof randomPostcode).toBe('string');
    expect(randomPostcode.length).toBeGreaterThan(0);
  });

  it('should return a postcode that exists in the dataset', () => {
    const randomPostcode = getRandomPostcode();
    const result = findPostcode(randomPostcode);

    expect(result.found).toBe(true);
    expect(result.postcode).toBe(randomPostcode);
  });

  it('should return different postcodes on multiple calls', () => {
    const postcodes = new Set();

    for (let i = 0; i < 10; i++) {
      postcodes.add(getRandomPostcode());
    }

    expect(postcodes.size).toBeGreaterThan(1);
  });

  it('should return postcodes with correct format', () => {
    const randomPostcode = getRandomPostcode();

    expect(randomPostcode).toMatch(/^\d{5}$/);
  });
});
