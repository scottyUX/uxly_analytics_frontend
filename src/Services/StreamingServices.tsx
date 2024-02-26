import axios from "axios";

const HOST = "http://18.223.123.138:5000/";
//const HOST = "http://localhost:8888";

interface GraphData {
    // Structure of streams graph data expected from the backend
    address: string;
    timeRecorded: any;
    transactionsAverage: any;
    senders: any;
    receivers: any;
}

export async function getGraphData(address: string, chain: string): Promise<GraphData> {
    try {
        const response = await axios.get(`${HOST}/wallet/graph?address=${address}&chain=${chain}`);
        console.log(response);
        // Assuming backend sends the graph data in specific format
        // Adjust the following line to the actual response structure
        return response.data.graphData;
    } catch (error) {
        console.log('Error: ', error);
        // Return default or error-specific structure for GraphData
        return {
            address: address, 
            timeRecorded: [], 
            transactionsAverage: {}, 
            senders: [], 
            receivers: [], 
        };
    }
}