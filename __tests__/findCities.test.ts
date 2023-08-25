import { IndividualCityResult, findCities } from "../src/index";

describe("findCities", () => {
  test('Exact search for city "Pasir Mas" should return valid result', () => {
    const result = findCities("Pasir Mas");
    expect(result.found).toBe(true);
    expect(result.state).toBeDefined();
    expect(result.city).toBe("Pasir Mas");
    expect(result.postcodes).toBeInstanceOf(Array);
  });

  test('Non-exact search for term "Kota" should return array of results', () => {
    const result = findCities("Kota", false);
    expect(result.found).toBe(true);
    expect(result.results).toBeInstanceOf(Array);

    const hasKota = result.results?.some((cityObj: IndividualCityResult) =>
      cityObj.city.toLowerCase().includes("kota")
    );
    expect(hasKota).toBe(true);
  });

  test("Exact search for a non-existing city should return not found", () => {
    const result = findCities("NonExistingCity");
    expect(result.found).toBe(false);
  });

  test("Non-exact search for a non-existing term should return not found", () => {
    const result = findCities("NonExistingTerm", false);
    expect(result.found).toBe(false);
  });
});
