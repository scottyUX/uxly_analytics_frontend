import React, { useEffect, useRef } from 'react';
import Chart, { ChartOptions } from 'chart.js/auto';

interface WalletData {
    networth: {
        chains: ChainNetWorth[];
    };
}

interface ChainNetWorth {
    chain: string;
    native_balance_usd: string;
    native_balance_formatted: string;
    token_balance_usd: string;
}

interface TotalNativeBalanceGraphProps {
    wallets: WalletData[];
}

const TotalNativeBalanceGraph: React.FC<TotalNativeBalanceGraphProps> = ({ wallets }) => {
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

                const chainsData: Record<string, { nativeBalanceUSD: number; nativeBalance: number; tokenBalanceUSD: number }> = {};

                // Calculate totals for each chain
                wallets.forEach(wallet => {
                    wallet.networth.chains.forEach(chain => {
                        if (!chainsData[chain.chain]) {
                            chainsData[chain.chain] = {
                                nativeBalanceUSD: 0,
                                nativeBalance: 0,
                                tokenBalanceUSD: 0
                            };
                        }
                        chainsData[chain.chain].nativeBalanceUSD += parseFloat(chain.native_balance_usd);
                        chainsData[chain.chain].nativeBalance += parseFloat(chain.native_balance_formatted);
                        chainsData[chain.chain].tokenBalanceUSD += parseFloat(chain.token_balance_usd);
                    });
                });

                // Prepare data for Chart.js
                const labels = Object.keys(chainsData);
                const data = Object.values(chainsData);

                // Create a new chart instance
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Native Balance',
                            data: data.map(item => item.nativeBalance),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Native Balance (USD)',
                            data: data.map(item => item.nativeBalanceUSD),
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Token Balance (USD)',
                            data: data.map(item => item.tokenBalanceUSD),
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
    }, [wallets]);

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default TotalNativeBalanceGraph;
