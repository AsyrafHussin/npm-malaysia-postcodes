import { getPostcodes } from "../src/index";

describe("getPostcodes", () => {
  it("should be defined", () => {
    expect(getPostcodes).toBeDefined();
  });

  it("should return an array for valid inputs", () => {
    const exampleState = "Johor";
    const exampleCity = "Johor Bahru";
    expect(Array.isArray(getPostcodes(exampleState, exampleCity))).toBe(true);
  });

  it("should return correct postcodes for a given state and city", () => {
    const exampleState = "Johor";
    const exampleCity = "Johor Bahru";
    const expectedPostcodes = ["80000", "80100"];
    const postcodes = getPostcodes(exampleState, exampleCity);
    expectedPostcodes.forEach((postcode) => {
      expect(postcodes).toContain(postcode);
    });
  });

  it("should handle invalid cities appropriately", () => {
    const validState = "Johor";
    const invalidCity = "InvalidCity";
    const response = getPostcodes(validState, invalidCity);
    expect(response).toEqual([]);
  });

  it("should handle invalid states appropriately", () => {
    const invalidState = "InvalidState";
    const exampleCity = "Johor Bahru";
    const response = getPostcodes(invalidState, exampleCity);

    expect(response).toEqual([]);
  });
});
