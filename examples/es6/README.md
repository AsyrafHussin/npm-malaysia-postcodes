# ES6 Example - Separated Files

An example showing how to use the malaysia-postcodes package with separated HTML, CSS, and JavaScript files.

## File Structure

```bash
es6/
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

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open your browser to the displayed URL

## Learning Points

### JavaScript Modules

- Each functionality is in its own file
- Uses ES6 `import`/`export`
- Clean function organization

### File Organization

- **HTML**: Structure only
- **CSS**: All styles separated  
- **JS**: Split by functionality

### Functions Used

```javascript
// From address-selection.js
import { getStates, getCities, getPostcodes } from 'malaysia-postcodes';

// From autocomplete-search.js  
import { getPostcodesByPrefix } from 'malaysia-postcodes';
```

## Code Examples

### Basic State Loading

```javascript
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
```

### Search Implementation

```javascript
function performSearch(query) {
    const suggestions = getPostcodesByPrefix(query);
    showDropdown(suggestions.slice(0, 10));
}
```

Demonstrates:

- File separation
- Basic DOM manipulation  
- Event handling
- Module imports
