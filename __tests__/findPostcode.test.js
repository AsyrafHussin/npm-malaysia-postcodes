const { findPostcode } = require("../index");

describe("findPostcode", () => {
  it("should be defined", () => {
    expect(findPostcode).toBeDefined();
  });

  it("should return correct city and state for a given postcode", () => {
    const examplePostcode = "17070";
    const expectedState = "Kelantan";
    const expectedCity = "Pasir Mas";

    const result = findPostcode(examplePostcode);

    expect(result).toEqual({
      found: true,
      state: expectedState,
      city: expectedCity,
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
  });

  it("should return data with the expected structure for invalid postcodes", () => {
    const invalidPostcode = "99999";

    const result = findPostcode(invalidPostcode);

    expect(result).toHaveProperty("found", false);
    expect(result).not.toHaveProperty("state");
    expect(result).not.toHaveProperty("city");
  });
});
