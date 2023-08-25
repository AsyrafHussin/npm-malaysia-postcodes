import { ChangeEvent, useState } from "react";
import { getCities, getPostcodes, getStates } from "malaysia-postcodes";

import Select from "./components/Select";

interface AddressFormState {
  selectedState: string;
  selectedCity: string;
  selectedPostcode: string;
}

function App() {
  const [address, setAddress] = useState<AddressFormState>({
    selectedState: "",
    selectedCity: "",
    selectedPostcode: "",
  });

  const updateSelectedState = (event: ChangeEvent<HTMLSelectElement>) => {
    setAddress({
      ...address,
      selectedState: event.target.value,
      selectedCity: "",
      selectedPostcode: "",
    });
  };

  const updateSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setAddress({
      ...address,
      selectedCity: event.target.value,
      selectedPostcode: "",
    });
  };

  const updateSelectedPostcode = (event: ChangeEvent<HTMLSelectElement>) => {
    setAddress({
      ...address,
      selectedPostcode: event.target.value,
    });
  };

  const states = getStates();
  const cities = address.selectedState ? getCities(address.selectedState) : [];
  const postcodes =
    address.selectedState && address.selectedCity
      ? getPostcodes(address.selectedState, address.selectedCity)
      : [];

  return (
    <>
      <h2>Malaysia Address Form</h2>
      <Select
        id="state"
        value={address.selectedState}
        onChange={updateSelectedState}
        options={states}
        label="State"
      />
      <Select
        id="city"
        value={address.selectedCity}
        onChange={updateSelectedCity}
        options={cities}
        label="City"
      />
      <Select
        id="postcode"
        value={address.selectedPostcode}
        onChange={updateSelectedPostcode}
        options={postcodes}
        label="Postcode"
      />
    </>
  );
}

export default App;
