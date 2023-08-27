import { getPostcodesByPrefix } from '../src';

describe('getPostcodesByPrefix', () => {
  it('should return empty array if prefix is empty', () => {
    expect(getPostcodesByPrefix('')).toEqual([]);
  });

  it('should return empty array if prefix is null', () => {
    expect(getPostcodesByPrefix(null)).toEqual([]);
  });

  it('should return empty array if prefix length is greater than 5', () => {
    expect(getPostcodesByPrefix('170000')).toEqual([]);
  });

  it('should return all postcodes starting with prefix 170', () => {
    expect(getPostcodesByPrefix('170')).toEqual([
      '17000',
      '17007',
      '17009',
      '17010',
      '17020',
      '17030',
      '17040',
      '17050',
      '17060',
      '17070'
    ]);
  });

  it('should return all postcodes starting with prefix 1700', () => {
    expect(getPostcodesByPrefix('1700')).toEqual(['17000', '17007', '17009']);
  });

  it('should return an empty array if no postcode match the prefix', () => {
    expect(getPostcodesByPrefix('999')).toEqual([]);
  });
});
