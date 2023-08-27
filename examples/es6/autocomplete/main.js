import { getPostcodesByPrefix } from 'malaysia-postcodes';

function generateOptions(matchingPostcodes) {
  return matchingPostcodes.map(postcode => {
    const option = document.createElement('div');
    option.className = 'custom-option';
    option.innerHTML = postcode;
    option.addEventListener('click', function () {
      const postcodeInput = document.getElementById('postcodeInput');
      postcodeInput.value = this.innerHTML;
      hideDropdown();
    });
    return option;
  });
}

function hideDropdown() {
  const dropdown = document.getElementById('customDropdown');
  dropdown.innerHTML = '';
  dropdown.style.display = 'none';
}

function showDropdown(elements) {
  const dropdown = document.getElementById('customDropdown');
  dropdown.innerHTML = '';
  dropdown.style.display = 'block';
  elements.forEach(element => dropdown.appendChild(element));
}

function updateDatalist() {
  const postcodeInput = document.getElementById('postcodeInput');
  const input = postcodeInput.value;

  if (input.length >= 1 && input.length <= 5) {
    const matchingPostcodes = getPostcodesByPrefix(input);

    if (matchingPostcodes.length === 0) {
      hideDropdown();
      return;
    }

    const options = generateOptions(matchingPostcodes);
    showDropdown(options);
  } else {
    hideDropdown();
  }
}

document.addEventListener('DOMContentLoaded', event => {
  const postcodeInput = document.getElementById('postcodeInput');
  postcodeInput.addEventListener('input', updateDatalist);
});
