import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';
import "./displaymultiplewallet.css";

interface WalletData {
    networth: {
        chains: ChainNetWorth[];
    };
}

interface ChainNetWorth {
    chain: string;
    networth_usd: string;
}

interface DisplayMultipleNetworthProps {
    wallets: WalletData[];
}

const DisplayMultipleNetworth: React.FC<DisplayMultipleNetworthProps> = ({ wallets }) => {
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

                const chainsNetworth: Record<string, number> = {};

                // Calculate total networth_usd per chain
                wallets.forEach(wallet => {
                    wallet.networth.chains.forEach(chain => {
                        if (!chainsNetworth[chain.chain]) {
                            chainsNetworth[chain.chain] = 0;
                        }
                        chainsNetworth[chain.chain] += parseFloat(chain.networth_usd);
                    });
                });

                // Extract labels and data for Chart.js
                const labels = Object.keys(chainsNetworth);
                const data = Object.values(chainsNetworth);

                // Update canvas size
                const container = chartContainerRef.current;
                const width = container.clientWidth;
                const height = container.clientHeight;
                canvasRef.current.width = width;
                canvasRef.current.height = height;

                // Create a new chart instance
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Networth (USD)',
                            data: data,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                            y: {
                                type: 'logarithmic',
                                ticks: {
                                    callback: (value: string | number) => {
                                        return '$' + value.toLocaleString();
                                    }
                                }
                            }
                        }
                    } as ChartOptions
                });
            }
        }

        // Cleanup function
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [wallets]);

    return (
        <div ref={chartContainerRef} style={{ height: '300px', width: '100%' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default DisplayMultipleNetworth;
