const { getStates, getCities, getPostcodes, findPostcode } = require("../index");

// console.log(getStates());
// console.log(getCities("Wilayah Persekutuan Putra Jaya"));
// console.log(getPostcodes("Wilayah Persekutuan Kuala Lumpur", "Bangunan Bangkok Bank"));
// console.log(findPostcode("62988"));

test('Should get all the states', () => 
{ 
    expect(getStates().includes("Johor")).toBe(true);
});