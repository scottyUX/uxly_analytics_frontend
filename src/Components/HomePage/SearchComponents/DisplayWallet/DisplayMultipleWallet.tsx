import React from "react";
import DisplayMultipleBalance from "./MultipleWalletComponents/DisplayMultipleBalance";
import MultipleTransactionDetailsTable from "./MultipleWalletComponents/MultipleTransactionDetailsTable";
import BalanceDistribution from "./MultipleWalletComponents/BalanceDistribution";

interface WalletData {
    address: string;
    networth: any;
    nft: any;
    transactions: any;
    transactionsData: any;
}

interface DisplayMultipleWalletProps {
    wallets: WalletData[];
    chain: { value: string; label: string };
}


const DisplayMultipleWallet: React.FC<DisplayMultipleWalletProps> = ({
    wallets,
    chain,
}) => {
    const totalNetWorthUSD: number = wallets.reduce((acc, wallet) => {
        const totalNetWorthUSD = parseFloat(wallet.networth.total_networth_usd);
        return acc + totalNetWorthUSD;
    }, 0);
    
    const renderWalletData = () => {
        return (
            <>
            <div className="address-info">
                <strong>Total NetWorth Across All Wallets: ${totalNetWorthUSD}</strong>
                <br/>
            </div>
            <DisplayMultipleBalance wallets={wallets} />
            <br/><br/>
            <strong>Popular Chains Balance Distribution</strong>
            <BalanceDistribution wallets={wallets}/>
            <br/><br/>
            <strong>Transaction Data</strong>
            <MultipleTransactionDetailsTable wallets={wallets} />
            </>
        );
    };

    return <div>{renderWalletData()}</div>;
};

export default DisplayMultipleWallet;
