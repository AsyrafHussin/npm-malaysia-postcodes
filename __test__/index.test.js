const { getStates, getCities, getPostcodes, findPostcode } = require("../index");

// console.log(getStates());
// console.log(getCities("Wilayah Persekutuan Putra Jaya"));
// console.log(getPostcodes("Wilayah Persekutuan Kuala Lumpur", "Bangunan Bangkok Bank"));
// console.log(findPostcode("62988"));

test('Should get Johor properties correct', () => 
{ 
    expect(getStates().includes("Johor")).toBe(true);
    const cities = getCities("Johor")
    expect(cities.findIndex((city) => city === "Kota Tinggi") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Kluang") > -1).toBe(true);
    const postcodeList = getPostcodes("Johor", "Johor Bahru")
    expect(postcodeList.findIndex((postcode) => postcode === "80350") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("86000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Kluang").toBe(true);
});

test('Should get Kuala Lumpur properties correct', () => 
{ 
    expect(getStates().includes("Wilayah Persekutuan Kuala Lumpur")).toBe(true);
    const cities = getCities("Wilayah Persekutuan Kuala Lumpur")
    expect(cities.findIndex((city) => city === "Kuala Lumpur") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Hulu Langat") > -1).toBe(true);
    const postcodeList = getPostcodes("Wilayah Persekutuan Kuala Lumpur", "Kuala Lumpur")
    expect(postcodeList.findIndex((postcode) => postcode === "59100") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "71000") <= -1).toBe(true);
    const postcode = findPostcode("59100")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Kuala Lumpur").toBe(true);
});

test('Should get Kedah properties correct', () => 
{ 
    expect(getStates().includes("Kedah")).toBe(true);
    const cities = getCities("Kedah")
    expect(cities.findIndex((city) => city === "Gurun") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Jitra") > -1).toBe(true);
    const postcodeList = getPostcodes("Kedah", "Sungai Petani")
    expect(postcodeList.findIndex((postcode) => postcode === "08600") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("08600")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Sungai Petani").toBe(true);
});

test('Should get Kelantan properties correct', () => 
{ 
    expect(getStates().includes("Kelantan")).toBe(true);
    const cities = getCities("Kelantan")
    expect(cities.findIndex((city) => city === "Dabong") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Jeli") > -1).toBe(true);
    const postcodeList = getPostcodes("Kelantan", "Gua Musang")
    expect(postcodeList.findIndex((postcode) => postcode === "18300") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("18300")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Gua Musang").toBe(true);
});

test('Should get Melaka properties correct', () => 
{ 
    expect(getStates().includes("Melaka")).toBe(true);
    const cities = getCities("Melaka")
    expect(cities.findIndex((city) => city === "Melaka") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Jasin") > -1).toBe(true);
    const postcodeList = getPostcodes("Melaka", "Alor Gajah")
    expect(postcodeList.findIndex((postcode) => postcode === "78000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("78000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Alor Gajah").toBe(true);
});

test('Should get Negeri Sembilan properties correct', () => 
{ 
    expect(getStates().includes("Negeri Sembilan")).toBe(true);
    const cities = getCities("Negeri Sembilan")
    expect(cities.findIndex((city) => city === "Linggi") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Seremban") > -1).toBe(true);
    const postcodeList = getPostcodes("Negeri Sembilan", "Port Dickson")
    expect(postcodeList.findIndex((postcode) => postcode === "71000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("71000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Port Dickson").toBe(true);
});

test('Should get Pahang properties correct', () => 
{ 
    expect(getStates().includes("Pahang")).toBe(true);
    const cities = getCities("Pahang")
    expect(cities.findIndex((city) => city === "Karak") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Kuantan") > -1).toBe(true);
    const postcodeList = getPostcodes("Pahang", "Tanah Rata")
    expect(postcodeList.findIndex((postcode) => postcode === "39000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("39000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Tanah Rata").toBe(true);
});

test('Should get Pulau Pinang properties correct', () => 
{ 
    expect(getStates().includes("Pulau Pinang")).toBe(true);
    const cities = getCities("Pulau Pinang")
    expect(cities.findIndex((city) => city === "Jelutong") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Pulau Pinang") > -1).toBe(true);
    const postcodeList = getPostcodes("Pulau Pinang", "Butterworth")
    expect(postcodeList.findIndex((postcode) => postcode === "12000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("12000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Butterworth").toBe(true);
});

test('Should get Perak properties correct', () => 
{ 
    expect(getStates().includes("Perak")).toBe(true);
    const cities = getCities("Perak")
    expect(cities.findIndex((city) => city === "Ipoh") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Gopeng") > -1).toBe(true);
    const postcodeList = getPostcodes("Perak", "Kampar")
    expect(postcodeList.findIndex((postcode) => postcode === "31907") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("31907")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Kampar").toBe(true);
});

test('Should get Perlis properties correct', () => 
{ 
    expect(getStates().includes("Perlis")).toBe(true);
    const cities = getCities("Perlis")
    expect(cities.findIndex((city) => city === "Kuala Perlis") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Kangar") > -1).toBe(true);
    const postcodeList = getPostcodes("Perlis", "Simpang Ampat")
    expect(postcodeList.findIndex((postcode) => postcode === "02700") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("02700")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Simpang Ampat").toBe(true);
});

test('Should get Sabah properties correct', () => 
{ 
    expect(getStates().includes("Sabah")).toBe(true);
    const cities = getCities("Sabah")
    expect(cities.findIndex((city) => city === "Beaufort") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Kota Kinabatangan") > -1).toBe(true);
    const postcodeList = getPostcodes("Sabah", "Sandakan")
    expect(postcodeList.findIndex((postcode) => postcode === "90300") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("90300")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Sandakan").toBe(true);
});

test('Should get Sarawak properties correct', () => 
{ 
    expect(getStates().includes("Sarawak")).toBe(true);
    const cities = getCities("Sarawak")
    expect(cities.findIndex((city) => city === "Bintangor") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Dalat") > -1).toBe(true);
    const postcodeList = getPostcodes("Sarawak", "Bintulu")
    expect(postcodeList.findIndex((postcode) => postcode === "97000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("97000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Bintulu").toBe(true);
});

test('Should get Selangor properties correct', () => 
{ 
    expect(getStates().includes("Selangor")).toBe(true);
    const cities = getCities("Selangor")
    expect(cities.findIndex((city) => city === "Ampang") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Banting") > -1).toBe(true);
    const postcodeList = getPostcodes("Selangor", "Petaling Jaya")
    expect(postcodeList.findIndex((postcode) => postcode === "46000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("46000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Petaling Jaya").toBe(true);
});

test('Should get Terengganu properties correct', () => 
{ 
    expect(getStates().includes("Terengganu")).toBe(true);
    const cities = getCities("Terengganu")
    expect(cities.findIndex((city) => city === "Cukai") > -1).toBe(true);
    expect(cities.findIndex((city) => city === "Kerteh") > -1).toBe(true);
    const postcodeList = getPostcodes("Terengganu", "Kuala Terengganu")
    expect(postcodeList.findIndex((postcode) => postcode === "20500") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("20500")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Kuala Terengganu").toBe(true);
});

test('Should get Labuan properties correct', () => 
{ 
    expect(getStates().includes("Wilayah Persekutuan Labuan")).toBe(true);
    const cities = getCities("Wilayah Persekutuan Labuan")
    expect(cities.findIndex((city) => city === "Labuan") > -1).toBe(true);
    const postcodeList = getPostcodes("Wilayah Persekutuan Labuan", "Labuan")
    expect(postcodeList.findIndex((postcode) => postcode === "87000") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("87000")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Labuan").toBe(true);
});

test('Should get Putrajaya properties correct', () => 
{ 
    expect(getStates().includes("Wilayah Persekutuan Putra Jaya")).toBe(true);
    const cities = getCities("Wilayah Persekutuan Putra Jaya")
    expect(cities.findIndex((city) => city === "Putrajaya") > -1).toBe(true);
    const postcodeList = getPostcodes("Wilayah Persekutuan Putra Jaya", "Putrajaya")
    expect(postcodeList.findIndex((postcode) => postcode === "62300") > -1).toBe(true);
    expect(postcodeList.findIndex((postcode) => postcode === "81900") <= -1).toBe(true);
    const postcode = findPostcode("62300")
    expect(postcode.found).toBe(true);
    expect(postcode.city === "Putrajaya").toBe(true);
});