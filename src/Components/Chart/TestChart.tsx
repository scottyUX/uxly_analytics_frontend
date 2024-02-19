import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';

interface BarChartProps {
    data: number[];
    labels: string[];
    options?: ChartOptions;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, options }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Destroy previous instance
                }
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Token Balances',
                            data: data,
                            backgroundColor: 'rgba(131, 182, 176, 0.6)',
                            borderColor: 'rgba(131, 182, 176, 1)',
                            borderWidth: 2
                        }]
                    },
                    options: options || { // Provide default options if not provided
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        // Cleanup function to destroy the chart instance when component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, labels, options]);

    return (
        <div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarChart;
