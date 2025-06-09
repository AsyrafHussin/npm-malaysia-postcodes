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
      showResult(
        `Selected: <strong>${selectedState} → ${selectedCity}</strong>. Please select a postcode.`
      );
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
  const message = `
        <strong>✅ Complete Address Selected:</strong><br>
        📍 State: <code>${state}</code><br>
        🏘️ City: <code>${city}</code><br>
        📮 Postcode: <code>${postcode}</code>
    `;
  showResult(message);
}

function showResult(message) {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = `<div class="result success">${message}</div>`;
}

function clearResult() {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = '';
}

export { initAddressSelection };
