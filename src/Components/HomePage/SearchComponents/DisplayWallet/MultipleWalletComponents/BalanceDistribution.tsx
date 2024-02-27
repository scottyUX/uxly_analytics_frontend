import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "./displaymultiplewallet.css";

interface WalletData {
    address: string;
    activeChainsSimplified: any;
    nativeBalance: { chain: string; balance: string }[];
    nft: any;
    tokenBalance: any;
    transactions: any;
    transactionsData: any;
}

const BalanceDistribution: React.FC<{ wallets: WalletData[] }> = ({ wallets }) => {
    const chartRefs = useRef<Array<HTMLCanvasElement | null>>([]);
    const chartInstances = useRef<Array<Chart | null>>([]);

    useEffect(() => {
        // Clear previous charts
        chartInstances.current.forEach(chartInstance => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        });

        // Calculate total native balance for each chain
        const chainTotalBalances: { [key: string]: number } = {};
        wallets.forEach(wallet => {
            wallet.nativeBalance.forEach(({ chain, balance }) => {
                chainTotalBalances[chain] = (chainTotalBalances[chain] || 0) + parseFloat(balance);
            });
        });

        // Get the top 4 chains based on total native balance
        const topChains = Object.keys(chainTotalBalances)
            .sort((a, b) => chainTotalBalances[b] - chainTotalBalances[a])
            .slice(0, 4);

        // Render charts for the top 4 chains
        topChains.forEach((chain, index) => {
            const chartRef = chartRefs.current[index];
            if (chartRef) {
                const chainBalances = getChainBalances(chain);
                if (chainBalances.length > 0) {
                    const ctx = chartRef.getContext('2d');
                    if (ctx) {
                        const chartInstance = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: getRangesLabels(),
                                datasets: [{
                                    label: chain,
                                    data: getDistribution(chainBalances),
                                    backgroundColor: chainBalances.map(getBarColor),
                                    borderColor: 'rgba(54, 162, 235, 1)', // Border color
                                    borderWidth: 1, // Bold border width
                                    borderRadius: 3, // Border radius
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        type: 'linear',
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: 'Users'
                                        },
                                        ticks: {
                                            stepSize: 1
                                        }
                                    }
                                }
                            }
                        });
                        chartInstances.current[index] = chartInstance;
                    }
                }
            }
        });
    }); // Ensure useEffect runs only when wallets change

    // Function to get balances for a specific chain
    const getChainBalances = (chain: string) => {
        const balances: number[] = [];
        wallets.forEach(wallet => {
            wallet.nativeBalance.forEach(({ chain: chainName, balance }) => {
                if (chainName === chain) {
                    balances.push(parseFloat(balance));
                }
            });
        });
        return balances;
    };

    // Function to get predefined ranges
    const getRangesLabels = () => [
        '0 to 0.5',
        '0.5 to 1',
        '1 to 5',
        '5 to 20',
        '20+'
    ];

    // Function to calculate distribution for a specific chain
    const getDistribution = (balances: number[]) => {
        return [
            balances.filter(balance => balance >= 0 && balance <= 0.5).length,
            balances.filter(balance => balance > 0.5 && balance <= 1).length,
            balances.filter(balance => balance > 1 && balance <= 5).length,
            balances.filter(balance => balance > 5 && balance <= 20).length,
            balances.filter(balance => balance > 20).length
        ];
    };

    // Function to generate bar color based on balance
    const getBarColor = (balance: number) => {
        const opacity = 0.2 + 0.8 * (balance / 100); // Adjust as needed
        return `rgba(54, 162, 235, ${opacity})`; // Adjust color as needed
    };

    return (
        <div className="chart-container">
            <div className="row">
                <div className="col">
                    <canvas ref={el => chartRefs.current[0] = el}></canvas>
                </div>
                <div className="col">
                    <canvas ref={el => chartRefs.current[1] = el}></canvas>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <canvas ref={el => chartRefs.current[2] = el}></canvas>
                </div>
                <div className="col">
                    <canvas ref={el => chartRefs.current[3] = el}></canvas>
                </div>
            </div>
        </div>
    );
};

export default BalanceDistribution;
