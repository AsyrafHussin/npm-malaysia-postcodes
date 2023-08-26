import { findPostcode } from "../src/index";

describe("findPostcode", () => {
  it("should be defined", () => {
    expect(findPostcode).toBeDefined();
  });

  it("should return correct city, state, and postcode for a given postcode", () => {
    const examplePostcode = "17070";
    const expectedState = "Kelantan";
    const expectedCity = "Pasir Mas";

    const result = findPostcode(examplePostcode);

    expect(result).toEqual({
      found: true,
      state: expectedState,
      city: expectedCity,
      postcode: examplePostcode,
    });
  });

  it("should return { found: false } for invalid postcodes", () => {
    const invalidPostcode = "99999";

    const result = findPostcode(invalidPostcode);

    expect(result).toEqual({
      found: false,
    });
  });

  it("should return data with the expected structure for valid postcodes", () => {
    const examplePostcode = "17070";

    const result = findPostcode(examplePostcode);

    expect(result).toHaveProperty("found", true);
    expect(result).toHaveProperty("state");
    expect(result).toHaveProperty("city");
    expect(result).toHaveProperty("postcode");
  });

  it("should return data with the expected structure for invalid postcodes", () => {
    const invalidPostcode = "99999";

    const result = findPostcode(invalidPostcode);

    expect(result).toHaveProperty("found", false);
    expect(result).not.toHaveProperty("state");
    expect(result).not.toHaveProperty("city");
    expect(result).not.toHaveProperty("postcode");
  });

  it("should return multiple matches for non-exact search", () => {
    const partialPostcode = "170";

    const result = findPostcode(partialPostcode, false);

    expect(result).toHaveProperty("found", true);
    expect(result).toHaveProperty("results");
    expect(Array.isArray(result.results)).toBe(true);
    expect(result.results?.length).toBeGreaterThan(1);
    result.results?.forEach((match) => {
      expect(typeof match.postcode).toBe("string");
    });
  });

  it("should return { found: false } for non-exact search with no matches", () => {
    const nonMatchingPartialPostcode = "7777";

    const result = findPostcode(nonMatchingPartialPostcode, false);

    expect(result).toEqual({
      found: false,
    });
  });

  it("should return { found: false } when postcode is null", () => {
    const nullPostcode = null;

    const result = findPostcode(nullPostcode);

    expect(result).toEqual({
      found: false,
    });
  });

  it("should handle non-boolean values for isExactMatch by using the default", () => {
    const examplePostcode = "17070";
    const invalidIsExactMatch = "notABoolean";

    const resultWithBoolean = findPostcode(examplePostcode, true);
    const resultWithNonBoolean = findPostcode(
      examplePostcode,
      invalidIsExactMatch as any
    );

    expect(resultWithBoolean).toEqual(resultWithNonBoolean);
  });
});
