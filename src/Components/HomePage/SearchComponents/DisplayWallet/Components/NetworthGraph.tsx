import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';
import '../displaywallet.css';

interface NetworthProps {
    labels: string[];
    chainNetWorth: number[];
}

const NetworthGraph: React.FC<NetworthProps> = ({ labels, chainNetWorth }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart>();

    useEffect(() => {
        if (canvasRef.current && chartContainerRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Ensure the previous chart instance is destroyed
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Calculate width and height based on container size
                const container = chartContainerRef.current;
                const width = container.clientWidth;
                const height = container.clientHeight;

                // Update canvas size
                canvasRef.current.width = width;
                canvasRef.current.height = height;

                // Create a new chart instance
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Chain Networth (USD)',
                            data: chainNetWorth,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: false, // Allow the chart to fill the container
                        responsive: true,
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
        <div ref={chartContainerRef} style={{ height: '300px', width: '100%' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default NetworthGraph;
