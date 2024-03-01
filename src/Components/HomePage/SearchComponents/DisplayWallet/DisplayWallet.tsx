import React from "react";
import DisplayBalance from "./Components/DisplayBalance";
import DisplayNFTs from "./Components/DisplayNFTs";
import TransactionDetailsTable from "./Components/TransactionDetailsTable";
import TransactionTable from "./Components/TransactionTable";
import "./displaywallet.css";

interface WalletData {
  address: string;
  networth: any;
  nft: any;
  transactions: any;
  transactionsData: any;
}

interface DisplayWalletDataProps {
  walletData: WalletData;
  chain: { value: string; label: string };
}

const DisplayWalletData: React.FC<DisplayWalletDataProps> = ({
  walletData,
  chain,
}) => {
  console.log("Wallet data is:", walletData);
  const renderWalletData = () => {
    return (
      <>
        <div className="address-info">
          <strong>{walletData.address}'s Data</strong>
          <strong>Total Wallet NetWorth: ${walletData.networth.total_networth_usd}</strong>
        </div>
        <br />
        <DisplayBalance walletData={walletData} />
        <br />
        <div>
          <span style={{ fontWeight: "bold" }}>Transaction History:</span>
          <br />
          <br />
          <TransactionTable walletData={walletData} />
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>
            Transaction Details (last 100)
          </span>
          <br />
          <br />
          <TransactionDetailsTable walletData={walletData} />
        </div>
        <div>
          <DisplayNFTs walletData={walletData} />
        </div>
      </>
    );
  };

  return <div>{renderWalletData()}</div>;
};

export default DisplayWalletData;
