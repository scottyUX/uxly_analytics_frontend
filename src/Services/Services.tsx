import axios from "axios";

const HOST = "http://localhost:8888";

//the "s" at the beginning denotes a single address
//"m" denotes multiple addresses
//open to change
export async function sActiveChains(address: string){
    try{
        const response = await axios.get(`${HOST}/active-chains/${address}`);
        return response.data.response.active_chains;
    }catch (error){
        console.error('Error:', error);
        return 0;
    }
}