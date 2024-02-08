import React, { useState, ChangeEvent, FormEvent } from 'react';
import "./home.css";

interface SearchForm {
  onSubmit: (address: string, chain: string, searchType: string) => void;
}

function Search({ onSubmit }: SearchForm): JSX.Element {
  const [address, setAddress] = useState<string>('');
  const [chain, setChain] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('active-chains'); 

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value);
  }

  function handleChainChange(e: ChangeEvent<HTMLInputElement>): void {
    setChain(e.target.value);
  }

  function handleSearchTypeChange(e: ChangeEvent<HTMLSelectElement>): void{
    setSearchType(e.target.value);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    onSubmit(address, chain, searchType);
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
      <div className="search-type-dropdown">
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="active-chains">Active Chains</option>
          <option value="active-chains-simplified">Simplified Active Chains</option>
          <option value="native-balance">Native Balance</option>
          <option value="erc-balance">Erc Balance</option>
          <option value="nft">NFT</option>
        </select>
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default Search;
