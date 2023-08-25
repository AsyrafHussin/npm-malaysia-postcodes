import Select, { SingleValue } from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (selectedOption: SingleValue<Option>) => void;
}

const SelectInput = ({ label, options, value, onChange }: SelectInputProps) => (
  <div className="mt-3">
    <label htmlFor={label} className="block text-sm font-medium leading-6">
      {label}
    </label>
    <Select
      options={options}
      onChange={onChange}
      value={value ? { label: value, value } : null}
    />
  </div>
);

export default SelectInput;
