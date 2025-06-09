# Script Tag Example - Separated Files

An example using the malaysia-postcodes package via CDN with separated HTML, CSS, and JavaScript files.

## File Structure

```bash
script-tag/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── main.js            # Main entry point
│   ├── address-selection.js  # Cascade dropdown functions
│   └── autocomplete-search.js # Search functions
└── README.md              # This file
```

## Features

### 📍 Address Selection (Cascade Dropdowns)

- Select State → City → Postcode in sequence
- Uses: `getStates()`, `getCities()`, `getPostcodes()`

### 🔍 Autocomplete Search  

- Type to search postcodes by prefix
- Uses: `getPostcodesByPrefix()`

## How to Run

Open `index.html` in your browser - no build step needed!

## Learning Points

### CDN Usage

- Loads package from `jsdelivr.net` CDN
- No npm install or build process required
- Perfect for prototypes

### File Organization

- **HTML**: Structure only, links to CSS and JS files
- **CSS**: All styles separated  
- **JS**: Split by functionality, no modules

### Global Access

```javascript
// Package is available globally as window.malaysiaPostcodes
const states = window.malaysiaPostcodes.getStates();
```

## Code Examples

### Basic State Loading

```javascript
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
```

### Search with CDN

```javascript
function performSearch(query) {
    const suggestions = window.malaysiaPostcodes.getPostcodesByPrefix(query);
    showDropdown(suggestions.slice(0, 10));
}
```

Good for:

- Quick prototypes
- Learning JavaScript basics
- Projects without build tools
- Static websites
