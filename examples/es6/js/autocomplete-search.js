import { getPostcodesByPrefix } from 'malaysia-postcodes';

let searchTimeout;

function initAutocomplete() {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', handleSearch);

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.autocomplete-container')) {
      hideDropdown();
    }
  });
}

function handleSearch(event) {
  const query = event.target.value.trim();

  clearTimeout(searchTimeout);

  if (query.length < 2) {
    hideDropdown();
    clearSearchResult();
    return;
  }

  searchTimeout = setTimeout(() => {
    performSearch(query);
  }, 300);
}

function performSearch(query) {
  try {
    const suggestions = getPostcodesByPrefix(query);

    if (suggestions.length > 0) {
      showDropdown(suggestions.slice(0, 10));
    } else {
      hideDropdown();
      showSearchResult(`No postcodes found starting with "${query}"`);
    }
  } catch (error) {
    hideDropdown();
    showSearchResult('Error occurred during search');
  }
}

function showDropdown(suggestions) {
  const dropdown = document.getElementById('autocomplete-dropdown');

  dropdown.innerHTML = '';

  suggestions.forEach(postcode => {
    const option = document.createElement('div');
    option.className = 'autocomplete-option';
    option.textContent = postcode;
    option.addEventListener('click', () => selectSuggestion(postcode));
    dropdown.appendChild(option);
  });

  dropdown.style.display = 'block';
}

function hideDropdown() {
  const dropdown = document.getElementById('autocomplete-dropdown');
  dropdown.style.display = 'none';
}

function selectSuggestion(postcode) {
  const searchInput = document.getElementById('search-input');

  searchInput.value = postcode;
  hideDropdown();
  showSearchResult(`Selected postcode: <strong>${postcode}</strong>`);
}

function showSearchResult(message) {
  const resultDiv = document.getElementById('search-result');
  resultDiv.innerHTML = `<div class="result success">${message}</div>`;
}

function clearSearchResult() {
  const resultDiv = document.getElementById('search-result');
  resultDiv.innerHTML = '';
}

export { initAutocomplete };
