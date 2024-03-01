import React, { useEffect, useRef, useMemo } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import "../displaywallet.css";

interface BarGraphProps {
    data: number[];
    labels: string[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    const chartConfig = useMemo<ChartConfiguration>(() => ({
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Native Balance',
                data: [],
                backgroundColor: 'rgba(131, 182, 176, 1)',
                borderColor: 'rgba(131, 182, 176, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'black' // Set x-axis text color to black
                    }
                },
                y: {
                    ticks: {
                        color: 'black' // Set y-axis text color to black
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    labels: {
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    }), []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Destroy the previous chart instance
                }
                chartInstance.current = new Chart(ctx, chartConfig);
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Clean up on unmount
            }
        };
    }, [data, labels, chartConfig]);

    // Filter out subsequent labels with corresponding values of 0
    const filteredData = data.map((value, index) => (index === 0 || value >= 0.05 ? value : null)).filter(value => value !== null);
    const filteredLabels = labels.map((label, index) => (index === 0 || data[index] >= 0.05 ? label : null)).filter(label => label !== null);

    // Combine filtered data and labels into an array of objects
    const combinedData = filteredData.map((value, index) => ({ value, label: filteredLabels[index] }));

    // Separate the first data and labels
    const firstData = combinedData.slice(0, 1);
    const firstLabels = firstData.map(item => item.label);

    // Sort the rest of the combined data and labels by value in descending order
    const restData = combinedData.slice(1).sort((a, b) => (b.value || 0) - (a.value || 0));
    const restLabels = restData.map(item => item.label);

    // Combine the sorted rest of the data with the first data
    const sortedData = firstData.concat(restData).map(item => item.value || 0);
    const sortedLabels = firstLabels.concat(restLabels);

    // Update chartConfig with the sorted data and labels
    chartConfig.data.labels = sortedLabels;
    chartConfig.data.datasets[0].data = sortedData;

    return (
        <div className='balance-graph'>
            <canvas ref={chartRef} style={{ maxWidth: '100%'}} />
        </div>
    );
};

export default BarGraph;
