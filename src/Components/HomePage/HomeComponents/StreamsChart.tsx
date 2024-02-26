import * as React from 'react';
import { BarPlot, LinePlot, ChartContainer } from '@mui/x-charts';
import { ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
import { getGraphData } from '../../../Services/StreamingServices';
import { AllSeriesType } from '@mui/x-charts/models'; // Assuming this import is correct based on the provided structure

interface GraphData {
  address: string;
  timeRecorded: string[];
  transactionsAverages: number[];
  senders: number[];
  receivers: number[];
}

interface StackBar {
  address: string;
  chain: string;
}

export default function StackBars({ address, chain }: StackBar) {
  const [chartData, setChartData] = React.useState<GraphData[]>([]);

  const fetchData = React.useCallback(async () => {
    try {
      const data = await getGraphData(address, chain);
      setChartData(prevData => [...prevData, ...(Array.isArray(data) ? data : [data])]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [address, chain]);

  React.useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchData]);

  const series = React.useMemo(() => {
    if (chartData.length === 0) return [];

    const aggregatedSenders = chartData.flatMap(cur => cur.senders);
    const aggregatedReceivers = chartData.flatMap(cur => cur.receivers);
    const aggregatedTransactions = chartData.flatMap(cur => cur.transactionsAverages);

    const barSeriesSenders = {
      type: 'bar',
      stack: 'Senders',
      yAxisKey: 'userCount',
      data: aggregatedSenders.map((count, index) => ({ x: chartData[0].timeRecorded[index], y: count })),
    };

    const barSeriesReceivers = {
      type: 'bar',
      stack: 'Receivers',
      yAxisKey: 'userCount',
      data: aggregatedReceivers.map((count, index) => ({ x: chartData[0].timeRecorded[index], y: count })),
    };

    const lineSeriesTransactions = {
      type: 'line',
      yAxisKey: 'transactions',
      color: 'red',
      data: aggregatedTransactions.map((avg, index) => ({ x: chartData[0].timeRecorded[index], y: avg })),
    };

    return [barSeriesSenders, barSeriesReceivers, lineSeriesTransactions] as unknown as AllSeriesType[];
  }, [chartData]);

  return (
    <ChartContainer
      series={series}
      width={500}
      height={400}
      xAxis={[
        {
          id: 'time',
          scaleType: 'band',
          valueFormatter: (value: any) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: 'userCount',
          scaleType: 'linear',
          position: 'right',
          label: 'User Count',
        },
        {
          id: 'transactions',
          scaleType: 'linear',
          position: 'left',
          label: 'Transaction Averages',
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsXAxis label="Time" position="bottom" axisId="time" />
      <ChartsYAxis label="User Count" position="right" axisId="userCount" />
      <ChartsYAxis label="Transaction Averages" position="left" axisId="transactions" />
    </ChartContainer>
  );
}
