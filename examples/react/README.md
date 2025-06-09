# React Example

A React example using the malaysia-postcodes package with TypeScript.

## File Structure

```bash
react/
├── src/
│   ├── App.tsx            # Main React component
│   ├── styles.css         # Component styles
│   └── main.tsx           # Entry point
├── package.json           # Dependencies
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

### React Hooks

- `useState` for component state
- `useEffect` for side effects
- State management

### TypeScript

- Typing for props and state
- Import types from package

### React Patterns

- Controlled components
- Event handling
- Conditional rendering

## Code Examples

### State Management

```tsx
const [selectedState, setSelectedState] = useState('');
const [cities, setCities] = useState<string[]>([]);

// Load cities when state changes
useEffect(() => {
  if (selectedState) {
    const stateCities = getCities(selectedState);
    setCities(stateCities);
  }
}, [selectedState]);
```

### Search Implementation

```tsx
const handleSearch = (query: string) => {
  if (query.length >= 2) {
    const results = getPostcodesByPrefix(query);
    setSearchResults(results.slice(0, 10));
    setShowDropdown(true);
  }
};
```

Demonstrates:

- React basics
- TypeScript fundamentals  
- State management
- Event handling
