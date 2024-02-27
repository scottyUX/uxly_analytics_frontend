import React from 'react';
import Select from 'react-select';

interface Search{
  // value: string;
  label: string;
}

interface SearchSelectProps {
  value: Search;
  onChange: (search: Search) => void;
}

// Options for the dropdown
function getSearchOptions(): Search[] {
  return [
      {label: 'Wallet' },
      {label: "Streams" },
    // Add more options as needed
  ];
}

function SearchSelect({ value, onChange }: SearchSelectProps): JSX.Element {
  function handleSearchChange(selectedSearch: Search | null): void {
    if (selectedSearch){
      onChange(selectedSearch);
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '20px',
      width: '150px',
      marginRight: '10px',
      borderColor: '#EB5763',
      borderWidth: '2px',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
  };

  const selectedOption = value && Object.values(value).every(val => val === "") ? null : value;

  return (
    <Select
      options={getSearchOptions()}
      value={selectedOption}
      onChange={handleSearchChange}
      placeholder="Select Search"
      isSearchable
      required
      styles={customStyles}
    />
  );
}

export default SearchSelect;