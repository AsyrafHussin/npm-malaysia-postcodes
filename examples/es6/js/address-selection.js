import { getCities, getPostcodes, getStates } from 'malaysia-postcodes';

function initAddressSelection() {
  loadStates();
  setupEventListeners();
}

function loadStates() {
  const stateSelect = document.getElementById('state-select');
  const states = getStates();

  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}

function loadCities(selectedState) {
  const citySelect = document.getElementById('city-select');
  const postcodeSelect = document.getElementById('postcode-select');

  clearDropdown(citySelect);
  clearDropdown(postcodeSelect);

  if (!selectedState) return;

  try {
    const cities = getCities(selectedState);

    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });

    citySelect.disabled = false;
  } catch (error) {
    showResult(`Error loading cities for ${selectedState}`);
  }
}

function loadPostcodes(selectedState, selectedCity) {
  const postcodeSelect = document.getElementById('postcode-select');

  clearDropdown(postcodeSelect);

  if (!selectedState || !selectedCity) return;

  try {
    const postcodes = getPostcodes(selectedState, selectedCity);

    postcodes.forEach(postcode => {
      const option = document.createElement('option');
      option.value = postcode;
      option.textContent = postcode;
      postcodeSelect.appendChild(option);
    });

    postcodeSelect.disabled = false;
  } catch (error) {
    showResult(`Error loading postcodes for ${selectedCity}`);
  }
}

function clearDropdown(selectElement) {
  selectElement.innerHTML = selectElement.firstElementChild.outerHTML;
  selectElement.disabled = true;
}

function setupEventListeners() {
  const stateSelect = document.getElementById('state-select');
  const citySelect = document.getElementById('city-select');
  const postcodeSelect = document.getElementById('postcode-select');

  stateSelect.addEventListener('change', function () {
    const selectedState = this.value;
    loadCities(selectedState);
    clearResult();

    if (selectedState) {
      showResult(
        `Selected state: <strong>${selectedState}</strong>. Please select a city.`
      );
    }
  });

  citySelect.addEventListener('change', function () {
    const selectedState = stateSelect.value;
    const selectedCity = this.value;
    loadPostcodes(selectedState, selectedCity);
    clearResult();

    if (selectedCity) {
      const selection = document.createElement('strong');
      selection.textContent = `${selectedState} → ${selectedCity}`;
      showResult('Selected: ', selection, '. Please select a postcode.');
    }
  });

  postcodeSelect.addEventListener('change', function () {
    const selectedState = stateSelect.value;
    const selectedCity = citySelect.value;
    const selectedPostcode = this.value;
    clearResult();

    if (selectedPostcode) {
      showCompleteAddress(selectedState, selectedCity, selectedPostcode);
    }
  });
}

function showCompleteAddress(state, city, postcode) {
  const title = document.createElement('strong');
  title.textContent = '✅ Complete Address Selected:';

  const stateCode = document.createElement('code');
  stateCode.textContent = state;
  const cityCode = document.createElement('code');
  cityCode.textContent = city;
  const postcodeCode = document.createElement('code');
  postcodeCode.textContent = postcode;

  showResult(
    title,
    document.createElement('br'),
    '📍 State: ',
    stateCode,
    document.createElement('br'),
    '🏘️ City: ',
    cityCode,
    document.createElement('br'),
    '📮 Postcode: ',
    postcodeCode
  );
}

function showResult(...nodes) {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = '';

  const result = document.createElement('div');
  result.className = 'result success';
  result.append(...nodes);

  resultDiv.appendChild(result);
}

function clearResult() {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = '';
}

export { initAddressSelection };
