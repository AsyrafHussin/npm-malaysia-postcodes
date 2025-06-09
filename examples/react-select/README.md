# React Select Example

A React example using the malaysia-postcodes package with React Select component.

## File Structure

```bash
react-select/
├── src/
│   ├── App.tsx            # Main React component
│   ├── styles.css         # Component styles
│   └── main.tsx           # Entry point
├── package.json           # Dependencies
└── README.md              # This file
```

## Features

### 📍 Address Selection (React Select Dropdowns)

- Select State → City → Postcode with React Select
- Searchable and clearable dropdowns
- Uses: `getStates()`, `getCities()`, `getPostcodes()`

### 🔍 Autocomplete Search  

- Type to search postcodes with React Select
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

### React Select

- Using React Select component
- Searchable dropdowns
- Custom styling
- Option formatting

### TypeScript

- Type-only imports
- React Select types
- Event handling

### React Patterns

- Controlled components
- State management
- Effect hooks

## Code Examples

### React Select Basic Usage

```tsx
import Select, { type SingleValue } from 'react-select';

<Select
  value={stateOption}
  onChange={handleStateChange}
  options={stateOptions}
  placeholder="Select State"
  isClearable
  isSearchable
/>
```

### Custom Styling

```tsx
const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    borderColor: '#ddd',
    '&:hover': { borderColor: '#007bff' }
  })
};
```

Demonstrates:

- React Select component
- Advanced dropdown features
- Custom component styling
- TypeScript with React Select
