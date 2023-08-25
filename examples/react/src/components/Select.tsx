import { ChangeEvent } from "react";

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
}

const Select = ({ id, value, onChange, options, label }: SelectProps) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <select id={id} value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
