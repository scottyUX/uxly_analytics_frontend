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
    const renderWalletData = () => {
        return (
            <>
            <strong>Aggregated Data</strong>
            <DisplayMultipleBalance wallets={wallets} />
            <br/><br/>
            <strong>Native Balance Distribution</strong>
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
