import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';

interface NativeBalanceGraphPROPS {
    labels: string[];
    nativeBalance: number[];
    nativeBalanceUSD: number[];
    tokenBalanceUSD: number[];
}

const NativeBalanceGraph: React.FC<NativeBalanceGraphPROPS> = ({ labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart>();

    useEffect(() => {
        if (canvasRef.current && containerRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const container = containerRef.current;
                const canvas = canvasRef.current;
        
                if (!container || !canvas) return;
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;

                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Native Balance (Formatted)',
                            data: nativeBalance,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Native Balance (USD)',
                            data: nativeBalanceUSD,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Token Balance (USD)',
                            data: tokenBalanceUSD,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                type: 'logarithmic', // Logarithmic scale
                                ticks: {
                                    callback: (value: string | number) => {
                                        return value.toLocaleString();
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 20,
                                bottom: 20
                            }
                        },
                        responsive: true, // Make the chart responsive
                        maintainAspectRatio: false // Prevent the chart from maintaining its aspect ratio
                    } as ChartOptions
                });
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD]);

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default NativeBalanceGraph;
