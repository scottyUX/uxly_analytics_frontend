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

export async function sSimplifiedActiveChains(address: string){
    try{
        const response = await axios.get(`${HOST}/active-chains-simplified/${address}`);
        return response.data.chains;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sNativeBalance(address: string){
    try{
        const response = await axios.get(`${HOST}/native-balance/${address}`);
        return response.data.balance;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sErcBalance(address: string){
    try{
        const response = await axios.get(`${HOST}/erc-balance/${address}`);
        return response.data.tokens;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}

export async function sNFT(address: string){
    try{
        const response = await axios.get(`${HOST}/nft/${address}`);
        console.log(response);
        return response.data.nfts;
    }catch(error){
        console.error('Error:', error);
        return 0;
    }
}