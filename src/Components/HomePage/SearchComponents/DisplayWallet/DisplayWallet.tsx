import React from "react";
import DisplayBalance from "./Components/DisplayBalance";
import DisplayNFTs from "./Components/DisplayNFTs";
import TransactionTable from "./Components/TransactionTable";
import "./displaywallet.css";
import TokenBalance from "./Components/TokenBalance";
import { Grid } from "@mui/material";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
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
  console.log("Tokens are:", walletData.tokenBalance);
  const renderWalletData = () => {
    return (
      <>
        <DisplayBalance walletData={walletData} />
        {/* Left column */}
        <TransactionTable
          walletData={walletData}
          address={walletData.address}
        />
        <DisplayNFTs walletData={walletData} />
        {walletData.tokenBalance && Array.isArray(walletData.tokenBalance) && (
          <TokenBalance
            data={walletData.tokenBalance.filter(
              (x: any) => x.split(" ").length > 2 || x.includes("$")
            )}
          />
        )}
      </>
    );
  };

  return <>{renderWalletData()}</>;
};

export default DisplayWalletData;
