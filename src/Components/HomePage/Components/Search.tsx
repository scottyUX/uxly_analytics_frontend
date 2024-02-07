import React, { useState, ChangeEvent, FormEvent } from 'react';
import "./home.css";

interface SearchForm {
  onSubmit: (address: string, chain: string) => void;
}

function Search({ onSubmit }: SearchForm): JSX.Element {
  const [address, setAddress] = useState<string>('');
  const [chain, setChain] = useState<string>('');

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value);
  }

  function handleChainChange(e: ChangeEvent<HTMLInputElement>): void {
    setChain(e.target.value);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    onSubmit(address, chain);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Chain"
          value={chain}
          onChange={handleChainChange}
          //required
        />
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default Search;
