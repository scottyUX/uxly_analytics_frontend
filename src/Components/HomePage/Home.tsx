import React, {useState} from "react";
import Search from "./Components/Search";
import "./Components/home.css";
import Header from './HomeHeader';

function Home(){
    const [searchInput, setSearchInput] = useState<{ address: string; chain: string } | null>(null);

    const handleSearchSubmit = (address: string, chain: string) => {
        console.log("Address ", address);
        console.log("Chain: ", chain);
        setSearchInput({ address, chain });
    };
    return(
        <div className="app-container">
            <section className="header-section">
              <Header />
            </section>
            <div className="center-content">
            <h1>Blockchain Analytics</h1>
            <Search onSubmit={handleSearchSubmit}/>
            {searchInput && (
                <div>
                    <p>User Address: {searchInput.address}</p>
                    <p>Chain: {searchInput.chain}</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default Home;