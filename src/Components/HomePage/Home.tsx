import React, { useState, useEffect } from "react";
import Search from "./SearchComponents/Search";
import * as Service from "../../Services/WalletServices";
import DisplayWalletData from "./SearchComponents/DisplayWallet/DisplayWallet";
import DisplayMultipleWallet from "./SearchComponents/DisplayWallet/DisplayMultipleWallet";
import Header from "./HomeComponents/HomeHeader";
import LoadScreen from "./HomeComponents/LoadScreen";
import StackBars from "./HomeComponents/StreamsChart";
import "./HomeComponents/home.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface Chain  {
  value: string;
  label: string;
}

function Home() {
  const [searchInput, setSearchInput] = useState<{
    address: string[];
    chain: Chain;
  } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  const handleSearchSubmit = async (address: string[], chain: Chain) => {
    setLoading(true); // Set loading state to true when submit starts
    console.log("Address ", address);
    console.log("Chain: ", chain.label, chain.value);
    const uniqueAddresses = Array.from(new Set(address));
    setSearchInput({ address: uniqueAddresses, chain });
    try{
      if (uniqueAddresses.length === 1){
        setData(await Service.getWalletData(uniqueAddresses[0], chain.value));
      }else{
        setData(await Service.getMultipleWalletData(uniqueAddresses, chain.value));
      }
    }catch(error){
      console.error("Error Fetching Data: ", error);
    }
    setLoading(false); // Set loading state to false when submit finishes
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard); // Function to change the state to show the dashboard
  };

  // Consolidated return statement
  return (
    <div>
      <div className="app-container">
        <section className="header-section">
          <Header />
        </section>
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
          {loading && <LoadScreen/>}
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
          ):(
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
          <button onClick={toggleDashboard}>
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
          </button>
          {showDashboard && searchInput && (
           <StackBars address={searchInput.address} chain={searchInput.chain.value} /> // This is where the Dashboard component is rendered
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Home;


