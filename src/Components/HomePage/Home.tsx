import React, { useState } from "react";
import Search from "./Components/Search";
import * as Service from "../../Services/Services";
import "./Components/home.css";

function Home() {
  const [searchInput, setSearchInput] = useState<{ address: string; chain: string; searchType: string } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchSubmit = async (address: string, chain: string, searchType: string) => {
    setLoading(true); // Set loading state to true when submit starts
    console.log("Address ", address);
    console.log("Chain: ", chain);
    console.log("Search: ", searchType);
    setSearchInput({ address, chain, searchType });
    if (searchType === "active-chains"){
      setData(await Service.sActiveChains(address));
    }else if (searchType === "active-chains-simplified"){
      setData(await Service.sSimplifiedActiveChains(address));
    }else if (searchType === "native-balance"){
      setData(await Service.sNativeBalance(address));
    }else if (searchType === "erc-balance"){
      setData(await Service.sErcBalance(address));
    }else if (searchType === "nft"){
      setData(await Service.sNFT(address));
    }
    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <h1>Blockchain Analytics</h1>
        <Search onSubmit={handleSearchSubmit} />
        <ul>0x26fcbd3afebbe28d0a8684f790c48368d21665b5</ul>
        {loading && <p>Fetching Data...</p>}
      </div>
      {!loading && data && (
        <div className="loaded-data">
          <strong>Data:</strong>
          {Array.isArray(data) ? (
            <ul>
              {data.map((item: any, index: number) => (
                <li key={index}>
                  {typeof item === 'string' ? (
                    item
                  ) : (
                    Object.entries(item).map(([key, value]) => (
                      <span key={key}>
                        <strong>{key}:</strong> {JSON.stringify(value)}<br />
                      </span>
                    ))
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>{JSON.stringify(data)}</p>
          )}
        </div>
        )}
    </div>
  );
}

export default Home;
