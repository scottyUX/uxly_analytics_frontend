import React, { useState, useEffect, useRef } from "react";
import Search from "./SearchComponents/Search";
import * as Service from "../../Services/WalletServices";
import DisplayWalletData from "./SearchComponents/DisplayWallet/DisplayWallet";
import DisplayMultipleWallet from "./SearchComponents/DisplayWallet/DisplayMultipleWallet";
import Header from "./HomeComponents/HomeHeader";
import LoadScreen from "./HomeComponents/LoadScreen";
import "./HomeComponents/home.css";

interface Chain {
  value: string;
  label: string;
}

function Home() {
  const loadScreenRef = useRef<HTMLDivElement>(null); // Create a ref for LoadScreen component
  const [searchInput, setSearchInput] = useState<{
    address: string[];
    chain: Chain;
  } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  const handleSearchSubmit = async (address: string[], chain: Chain) => {
    setLoading(true);
    console.log("Address ", address);
    console.log("Chain: ", chain.label, chain.value);
    const uniqueAddresses = Array.from(new Set(address));
    setSearchInput({ address: uniqueAddresses, chain });
    try {
      if (uniqueAddresses.length === 1) {
        setData(await Service.getWalletData(uniqueAddresses[0], chain.value));
      } else {
        setData(await Service.getMultipleWalletData(uniqueAddresses, chain.value));
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Scroll to LoadScreen component when loading state changes to true
    if (loading && loadScreenRef.current) {
      loadScreenRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div>
      <div className="app-container">
        <section className="header-section">
          <Header />
        </section>
        <div className="center-content">
          <h1>Wallet Analytics</h1>
          <Search onSubmit={handleSearchSubmit} />
          <ul>Test Address: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5</ul>
          <ul>
            Test Address for transactions:
            0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326
          </ul>
          {loading && <LoadScreen ref={loadScreenRef} />}
        </div>
      </div>
      <div>
        {!loading && data && (
          Array.isArray(data) ? (
            data.length !== 0 ? (
              <div className="loaded-data">
                <DisplayMultipleWallet
                  wallets={data}
                  chain={searchInput?.chain || { value: "", label: "" }}
                />
              </div>
            ) : (
              <strong className="loaded-data">Error fetching data. Try again</strong>
            )
          ) : (
            data.address !== "null" ? (
              <div className="loaded-data">
                <DisplayWalletData
                  walletData={data}
                  chain={searchInput?.chain || { value: "", label: "" }}
                />
              </div>
            ) : (
              <strong className="loaded-data">Error fetching data. Try again</strong>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Home;
