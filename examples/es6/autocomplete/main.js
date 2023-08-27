import { getPostcodesByPrefix } from 'malaysia-postcodes';

function updateDatalist() {
  const input = document.getElementById('postcodeInput').value;
  const dataList = document.getElementById('postcodes');
  dataList.innerHTML = '';

  const matchingPostcodes = getPostcodesByPrefix(input);

  for (const postcode of matchingPostcodes) {
    const option = document.createElement('option');
    option.value = postcode;
    dataList.appendChild(option);
  }
}

document.addEventListener('DOMContentLoaded', event => {
  document
    .getElementById('postcodeInput')
    .addEventListener('input', updateDatalist);
});
