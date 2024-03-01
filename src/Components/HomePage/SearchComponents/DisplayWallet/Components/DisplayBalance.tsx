import React from 'react';
import NetworthGraph from './NetworthGraph';
import NativeBalanceGraph from './NativeBalanceGraph';
import "../displaywallet.css";

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

const DisplayBalance: React.FC<{walletData: WalletData}> = ({walletData}) => {
    const chains : ChainNetWorth[] = walletData.networth.chains;
    const labels: string[] = chains.map(chain => chain.chain);
    const chainNetWorth: number[] = chains.map(chain => parseFloat(chain.networth_usd));
    const totalNetworth: number = parseFloat(walletData.networth.total_networth);
    const nativeBalance: number[] = chains.map(chain => parseFloat(chain.native_balance_formatted));
    const nativeBalanceUSD: number[] = chains.map(chain => parseFloat(chain.native_balance_usd));
    const tokenBalance: number [] = chains.map(chain => parseFloat(chain.token_balance_usd));

    return(
        <div className='balance-graph'>
            <NetworthGraph labels = {labels} chainNetWorth = {chainNetWorth}/>
            <NativeBalanceGraph
                labels={labels}
                nativeBalance={nativeBalance}
                nativeBalanceUSD={nativeBalanceUSD}
                tokenBalanceUSD={tokenBalance}
            />
        </div>
    )
}

export default DisplayBalance;