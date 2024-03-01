import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';
import "../displaywallet.css";

interface NetworthProps {
    labels: string[];
    chainNetWorth: number[];
}

const NetworthGraph: React.FC<NetworthProps> = ({ labels, chainNetWorth }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart>();

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Ensure the previous chart instance is destroyed
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Calculate width as twice the height (300px)
                const width = 600;

                // Set canvas dimensions
                canvasRef.current.width = width;
                canvasRef.current.height = 300;

                // Create a new chart instance
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Networth (USD)',
                            data: chainNetWorth,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                type: 'logarithmic', // Set y-axis scale to logarithmic
                                ticks: {
                                    callback: (value: string | number) => {
                                        return '$' + value.toLocaleString(); // Format ticks as currency
                                    }
                                }
                            }
                        }
                    } as ChartOptions // Explicitly type the options as ChartOptions
                });
            }
        }

        // Cleanup function to destroy the chart instance when component unmounts or when data changes
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [labels, chainNetWorth]);

    return (
        <div style={{ height: '400px', width: '500px' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default NetworthGraph;
