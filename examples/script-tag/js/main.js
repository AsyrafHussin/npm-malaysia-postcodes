document.addEventListener('DOMContentLoaded', function () {
  try {
    if (typeof window.malaysiaPostcodes === 'undefined') {
      console.error('Malaysia Postcodes package not loaded from CDN');
      return;
    }

    initAddressSelection();
    initAutocomplete();
  } catch (error) {
    console.error('Failed to start app:', error);
  }
});
