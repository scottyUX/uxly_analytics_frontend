import React, { useState, useEffect } from 'react';
// ... (other imports)
import {
    ComposedChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import Box from '@mui/material/Box';
import { TooltipProps } from 'recharts';


interface StreamData {
  time: number[];
  values: string[];
  decimalValues: string[];
  senders: string[];
  receivers: string[];
  averageValue: number;
}

interface DisplayStreamsDataProps {
    rawData: StreamData; // Use the StreamData interface defined above
  }

interface CustomTooltipProps extends TooltipProps<number, string> {}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
  }

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const value = typeof data.Value === 'number' ? data.Value.toFixed(2) : 'N/A';
      const decimalValue = typeof data.decimalValue === 'number' ? data.decimalValue.toFixed(2) : 'N/A';
      const averageValue = payload[0].payload.averageValue?.toFixed(2) || 'N/A';
      const sender = payload[0].payload.Sender || 'Unknown'; 
      const receiver = payload[0].payload.Receiver || 'Unknown';

    return (
      <div className="custom-tooltip" style={{
        backgroundColor: '#fff',
        padding: '5px 10px', // Smaller top and bottom padding
        border: '1px solid #ccc',
        fontSize: '14px', // Smaller font size
      }}>
        <p>{`Time: ${label}`}</p>
        <p>{`Value: ${value}`}</p>
        <p>{`Decimal Value: ${decimalValue}`}</p>
        <p>{`Average Value: ${averageValue}`}</p>
        <p>{`Sender: ${sender}`}</p>
        <p>{`Receiver: ${receiver}`}</p>
      </div>
      );
    }
  
    return null;
  };

const DisplayStreamsTimeline: React.FC<DisplayStreamsDataProps> = ({ rawData }) => {
  // Destructure your rawData here
  const { time, values, decimalValues, senders, receivers, averageValue } = rawData;

  // Initialize chartData state
  const [chartData, setChartData] = useState([] as any[]);

  // Function to transform rawData to chartData format
  const transformData = (data: StreamData) => {
    return data.time.map((timestamp, index) => {
      const cleanedValue = data.values[index].replace(/[^0-9.-]+/g, "");
      const intValue = parseInt(cleanedValue, 10);
      return {
        time: new Date(timestamp).toLocaleTimeString(),
        Value: !isNaN(intValue) ? intValue : 0,
        Sender: data.senders[index],
        Receiver: data.receivers[index],
        decimalValue: parseFloat(data.decimalValues[index]) || 0,
        averageValue: data.averageValue
      };
    });
  };

  // Function to update chartData on an interval
  const updateChartData = () => {
    const newChartData = transformData(rawData);

    // Update the state with the new chart data
    setChartData(newChartData);
  };

  useEffect(() => {
    // Update chart data immediately and then set interval
    updateChartData();
    const intervalId = setInterval(() => {
      // Append the current time with no new value to the chart data
      setChartData(prevData => [...prevData, {
        time: new Date().toLocaleTimeString(),
        Value: prevData.length ? prevData[prevData.length - 1].Value : 0,  // Use the last known value
        Sender: '',
        Receiver: '',
        decimalValue: 0,
        averageValue: rawData.averageValue
      }]);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [rawData]);

  return (
    <div style={{ width: '100%', height: '500px', marginTop: '14rem' }}>
              <ResponsiveContainer width="100%" height={700}>
      <ComposedChart data={chartData} margin={{ top: 10, right: 50, left: 50, bottom: 50, }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" angle={-45} textAnchor="end" height={70} fontSize= '13px'/>
        <YAxis fontSize= '14px' type="number"
               domain={['auto', 'auto']} //{[0, 1.05e6]} // Set the upper bound to 1.05M domain={['auto', 'auto']} 
               allowDataOverflow={true} 
               tickCount={11}
               tickFormatter={(value) => `${value / 1e6}M`}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="decimalValue" fill="#EB5763" name="Smart Contract Transactions" width={4}/>
        <Line type="monotone" dataKey="decimalValue" name="Timeline" stroke="#82ca9d" strokeWidth={4}/>
        {/* Additional lines or bars can be added here 8884d8 */}
      </ComposedChart>
      </ResponsiveContainer>
      </div>
  );
};

export default DisplayStreamsTimeline;
