const { getStates } = require("../src/index");

describe("getStates", () => {
  it("should be defined", () => {
    expect(getStates).toBeDefined();
  });

  it("should return an array", () => {
    expect(Array.isArray(getStates())).toBe(true);
  });

  it("should return the expected number of states", () => {
    const expectedNumberOfStates = 16;
    expect(getStates().length).toBe(expectedNumberOfStates);
  });

  it("should return all expected states and territories", () => {
    const expectedStatesAndTerritories = [
      "Johor",
      "Kedah",
      "Kelantan",
      "Wp Kuala Lumpur",
      "Wp Labuan",
      "Melaka",
      "Negeri Sembilan",
      "Pahang",
      "Penang",
      "Perak",
      "Perlis",
      "Wp Putrajaya",
      "Sabah",
      "Sarawak",
      "Selangor",
      "Terengganu",
    ];

    const states = getStates();
    expectedStatesAndTerritories.forEach((state) => {
      expect(states).toContain(state);
    });
  });
});
