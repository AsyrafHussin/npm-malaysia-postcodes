/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCities, getPostcodes, getStates } from "malaysia-postcodes";
import Select from 'react-select'
import { useState } from "react";

export default function App() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const states = getStates();
  const cities = getCities(state)
  const postcodes = getPostcodes(state, city)

  const stateOptions = states.map((state) => ({
    value: state,
    label: state,
  }));

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const postcodeOptions = postcodes.map((postcode) => ({
    value: postcode,
    label: postcode,
  }));

  return (
    <div className="flex flex-col p-72 h-screen bg-slate-100">
      <div className="flex items-center justify-center text-2xl font-semibold italic text-center">
        react-select with malaysia-postcodes 
      </div>
      <div className="flex items-center justify-center text-sm font-normal italic text-center">
        tailwindcss + vite + react + typescript = ❤️
      </div>
      <div className="mt-10 text-black">
        <div>
          <label htmlFor="location" className="block text-sm font-medium leading-6">
            State
          </label>
          <Select
            options={stateOptions}
            onChange={(e: any) => setState(e.value)}
          />
        </div> 

        {state ? (
          <div>
            <label htmlFor="location" className="block text-sm font-medium leading-6 ">
              City
            </label>
            <Select
              options={cityOptions}
              onChange={(e: any) => setCity(e.value)}
            />
          </div>
        ) : null}  

        {city ? (
          <>
          <div>
            <label htmlFor="location" className="block text-sm font-medium leading-6">
              Postcode
              </label>
              <Select
                options={postcodeOptions}
                onChange={(e: any) => console.log(e.value)}
              />
          </div>
            <div className="flex items-center justify-center">
              <button 
                onClick={() => {
                  setState('')
                  setCity('')
                }}
                className="p-2 bg-indigo-600 rounded-md text-white mt-2"
              >
                Reset
              </button>
            </div> 
          </>
        ): null}
      </div>
    </div>
  )
}