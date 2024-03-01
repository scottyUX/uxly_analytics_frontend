import React from 'react';
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

const DisplayStreamsData: React.FC<DisplayStreamsDataProps> = ({ rawData }) => {
   

  const { time, values, decimalValues, senders, receivers , averageValue} = rawData;
  //const averageData = [{ time: 'Average', value: averageValue }];

  const chartData = time.map((timestamp, index) => {
    const cleanedValue = values[index].replace(/[^0-9.-]+/g, "");
    const intValue = parseInt(cleanedValue, 10);
    return{
    time: new Date(timestamp).toLocaleTimeString(),
    Value: !isNaN(intValue) ? intValue : 0,
    Sender: senders[index],
    Receiver: receivers[index],
    decimalValue: parseFloat(decimalValues[index]) || 0,
    averageValue: averageValue
  };
  });


  return (
    <div style={{ width: '100%', height: '500px', marginTop: '2rem' }}>
              <ResponsiveContainer width="100%" height={600}>
      <ComposedChart data={chartData} margin={{ top: 20, right: 70, left: 70, bottom: 50, }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" angle={-45} textAnchor="end" height={70} fontSize= '13px'/>
        <YAxis fontSize= '14px' type="number"
               domain={['auto', 'auto']} 
               allowDataOverflow={true} 
               tickCount={10} 
               tickFormatter={(value) => `${value / 1e6}M`}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="decimalValue" fill="#EB5763" name="Smart Contract Transactions" />
        <Line type="monotone" dataKey="decimalValue" name="Trend" stroke="#82ca9d" strokeWidth={2}/>
        {/* Additional lines or bars can be added here 8884d8 */}
      </ComposedChart>
      </ResponsiveContainer>
      </div>
  );
};

export default DisplayStreamsData;
