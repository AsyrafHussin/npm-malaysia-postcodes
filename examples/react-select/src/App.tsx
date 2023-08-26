import { useState, useMemo } from 'react';
import SelectInput, { Option } from './components/SelectInput';
import { getCities, getPostcodes, getStates } from 'malaysia-postcodes';

interface AddressFormState {
  state: string;
  city: string;
  postcode: string;
}

export default function App() {
  const [address, setAddress] = useState<AddressFormState>({
    state: '',
    city: '',
    postcode: ''
  });

  const states = getStates();

  const generateOptions = (data: string[]): Option[] => {
    return data.map(item => ({
      value: item,
      label: item
    }));
  };

  const stateOptions: Option[] = useMemo(
    () => generateOptions(states),
    [states]
  );

  const cityOptions = useMemo(() => {
    return address.state ? generateOptions(getCities(address.state)) : [];
  }, [address.state]);

  const postcodeOptions = useMemo(() => {
    return address.state && address.city
      ? generateOptions(getPostcodes(address.state, address.city))
      : [];
  }, [address.state, address.city]);

  const handleSelectChange =
    (type: keyof AddressFormState) => (selectedOption: Option | null) => {
      const selectedValue = selectedOption ? selectedOption.value : '';

      const updatedAddress = { ...address, [type]: selectedValue };

      if (type === 'state') {
        updatedAddress.city = '';
        updatedAddress.postcode = '';
      }

      if (type === 'city') {
        updatedAddress.postcode = '';
      }

      setAddress(updatedAddress);
    };

  const resetAddress = () => {
    setAddress({
      state: '',
      city: '',
      postcode: ''
    });
  };

  return (
    <div className="flex flex-col h-screen p-72 bg-slate-100">
      <div className="flex items-center justify-center text-2xl italic font-semibold text-center">
        react-select with malaysia-postcodes
      </div>

      <div className="flex items-center justify-center text-sm italic font-normal text-center">
        tailwindcss + vite + react + typescript = ❤️
      </div>

      <div className="mt-10 text-black">
        <SelectInput
          label="State"
          options={stateOptions}
          value={address.state}
          onChange={handleSelectChange('state')}
        />

        {address.state && (
          <SelectInput
            label="City"
            options={cityOptions}
            value={address.city}
            onChange={handleSelectChange('city')}
          />
        )}

        {address.city && (
          <>
            <SelectInput
              label="Postcode"
              options={postcodeOptions}
              value={address.postcode}
              onChange={handleSelectChange('postcode')}
            />
            <div className="flex items-center justify-center">
              <button
                onClick={resetAddress}
                className="p-2 mt-2 text-white bg-indigo-600 rounded-md"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
