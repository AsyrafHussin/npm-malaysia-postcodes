function initAddressSelection() {
  loadStates();
  setupAddressEventListeners();
}

function loadStates() {
  const stateSelect = document.getElementById('state-select');
  const states = window.malaysiaPostcodes.getStates();

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
    const cities = window.malaysiaPostcodes.getCities(selectedState);

    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });

    citySelect.disabled = false;
  } catch (error) {
    showAddressResult(`Error loading cities for ${selectedState}`);
  }
}

function loadPostcodes(selectedState, selectedCity) {
  const postcodeSelect = document.getElementById('postcode-select');

  clearDropdown(postcodeSelect);

  if (!selectedState || !selectedCity) return;

  try {
    const postcodes = window.malaysiaPostcodes.getPostcodes(
      selectedState,
      selectedCity
    );

    postcodes.forEach(postcode => {
      const option = document.createElement('option');
      option.value = postcode;
      option.textContent = postcode;
      postcodeSelect.appendChild(option);
    });

    postcodeSelect.disabled = false;
  } catch (error) {
    showAddressResult(`Error loading postcodes for ${selectedCity}`);
  }
}

function clearDropdown(selectElement) {
  selectElement.innerHTML = selectElement.firstElementChild.outerHTML;
  selectElement.disabled = true;
}

function setupAddressEventListeners() {
  const stateSelect = document.getElementById('state-select');
  const citySelect = document.getElementById('city-select');
  const postcodeSelect = document.getElementById('postcode-select');

  stateSelect.addEventListener('change', function () {
    const selectedState = this.value;
    loadCities(selectedState);
    clearAddressResult();

    if (selectedState) {
      showAddressResult(
        `Selected state: <strong>${selectedState}</strong>. Please select a city.`
      );
    }
  });

  citySelect.addEventListener('change', function () {
    const selectedState = stateSelect.value;
    const selectedCity = this.value;
    loadPostcodes(selectedState, selectedCity);
    clearAddressResult();

    if (selectedCity) {
      showAddressResult(
        `Selected: <strong>${selectedState} → ${selectedCity}</strong>. Please select a postcode.`
      );
    }
  });

  postcodeSelect.addEventListener('change', function () {
    const selectedState = stateSelect.value;
    const selectedCity = citySelect.value;
    const selectedPostcode = this.value;
    clearAddressResult();

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
  showAddressResult(message);
}

function showAddressResult(message) {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = `<div class="result success">${message}</div>`;
}

function clearAddressResult() {
  const resultDiv = document.getElementById('cascade-result');
  resultDiv.innerHTML = '';
}
