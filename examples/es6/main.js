import { getCities, getPostcodes, getStates } from 'malaysia-postcodes';

const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');
const postcodeSelect = document.getElementById('postcode');

// Load states
getStates().forEach(state => {
  const option = new Option(state, state);
  stateSelect.appendChild(option);
});

// Update cities when a state is selected
stateSelect.addEventListener('change', function () {
  citySelect.innerHTML = '';
  const placeholderOption = new Option('Select City', '', true, true);
  placeholderOption.disabled = true;
  citySelect.appendChild(placeholderOption);

  const cities = getCities(this.value);

  cities.forEach(city => {
    const option = new Option(city, city);
    citySelect.appendChild(option);
  });

  updatePostcodes();
});

// Update postcodes when a city is selected
citySelect.addEventListener('change', updatePostcodes);

function updatePostcodes() {
  postcodeSelect.innerHTML = '';

  const placeholderOption = new Option('Select Postcode', '', true, true);
  placeholderOption.disabled = true;
  postcodeSelect.appendChild(placeholderOption);

  const postcodes = getPostcodes(stateSelect.value, citySelect.value);

  postcodes.forEach(postcode => {
    const option = new Option(postcode, postcode);
    postcodeSelect.appendChild(option);
  });
}
