import React, {useState} from "react";
//import axios from "axios";
import Search from "./Components/Search";
import * as Service from "../../Services/Services";
import "./Components/home.css";

function Home(){
    const [searchInput, setSearchInput] = useState<{ address: string; chain: string } | null>(null);
    const [data, setData] = useState<any>(null);

    const handleSearchSubmit = async (address: string, chain: string) => {
        console.log("Address ", address);
        console.log("Chain: ", chain);
        setSearchInput({ address, chain });
        setData(Service.sActiveChains(address));
        console.log(data);
    };
    return(
        <div className="app-container">
            <div className="center-content">
            <h1>Blockchain Analytics</h1>
            <Search onSubmit={handleSearchSubmit}/>
            {data && (
                (data.length) > 0 && (
                    <div>
                      <p>Data:</p>
                      <ul>
                        {data.map((item: string, index: string) => (
                          <li key={index}>
                            {Object.entries(item).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}: </strong>
                                {JSON.stringify(value)}
                              </div>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
            )}
            </div>
        </div>
    )
}

export default Home;