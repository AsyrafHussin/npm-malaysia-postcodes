import { initAddressSelection } from './address-selection.js';
import { initAutocomplete } from './autocomplete-search.js';

document.addEventListener('DOMContentLoaded', function () {
  try {
    initAddressSelection();
    initAutocomplete();
  } catch (error) {
    console.error('Failed to start app:', error);
  }
});
