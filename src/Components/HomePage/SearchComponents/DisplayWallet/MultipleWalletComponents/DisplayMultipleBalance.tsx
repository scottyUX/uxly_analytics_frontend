import React from 'react';
import MultipleBalanceGraph from './MultipleBalanceGraph';
import TotalNativeBalanceGraph from './DisplayTotalNativeBalance';
import "./displaymultiplewallet.css";

interface WalletData {
    networth: {
        total_networth:string;
        chains: ChainNetWorth[];
    };
}

interface ChainNetWorth{
    chain: string;
    native_balance_formatted: string;
    native_balance_usd: string;
    networth_usd: string;
    token_balance_usd: string;
}

const DisplayMultipleBalance: React.FC<{wallets: WalletData[]}> = ({wallets}) => {
    return(
        <div>
            <strong>Aggregate Wallet Data</strong>
            <div className="balance-graph">
                <MultipleBalanceGraph wallets={wallets}/>
                <TotalNativeBalanceGraph wallets={wallets}/>
            </div>
        </div>
    );
};

export default DisplayMultipleBalance;
