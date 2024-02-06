import React, {useState} from "react";
import axios from "axios";
import Search from "./Components/Search";
import "./Components/home.css";

function Home(){
    const [searchInput, setSearchInput] = useState<{ address: string; chain: string } | null>(null);
    const [data, setData] = useState<any>(null);

    const handleSearchSubmit = async (address: string, chain: string) => {
        console.log("Address ", address);
        console.log("Chain: ", chain);
        setSearchInput({ address, chain });
        try{
            const response = await axios.get(`http://localhost:8888/active-chains/?address=${address}`);
                setData(response);
                console.log(data)
        } catch(err) {
                console.error('Error:', err);
        }
    };
    return(
        <div className="app-container">
            <div className="center-content">
            <h1>Blockchain Analytics</h1>
            <Search onSubmit={handleSearchSubmit}/>
            {data && (
                <div>
                    {data}
                </div>
            )}
            </div>
        </div>
    )
}

export default Home;