import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface WalletData {
  transactionsData: {
    chain: string;
    inbound_value: number;
    inbound_count: number;
    inbound_mean: number;
    outbound_value: number;
    outbound_count: number;
    outbound_mean: number;
  }[];
}
interface GrandTotals {
    [key: string]: {
      chain: string;
      inbound_value: number;
      inbound_count: number;
      inbound_mean: number;
      outbound_value: number;
      outbound_count: number;
      outbound_mean: number;
    };
  }
  

interface MultipleTransactionTableProps {
  wallets: WalletData[];
}

const MultipleTransactionTable: React.FC<MultipleTransactionTableProps> = ({
  wallets,
}) => {
  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "chain", headerName: "Chain", width: 150 },
    { field: "inbound_value", headerName: "Total Inbound Value", width: 200 },
    { field: "inbound_count", headerName: "Total Inbound Count", width: 150 },
    { field: "inbound_mean", headerName: "Inbound Mean Value", width: 200 },
    { field: "outbound_value", headerName: "Total Outbound Value", width: 200 },
    { field: "outbound_count", headerName: "Total Outbound Count", width: 150 },
    { field: "outbound_mean", headerName: "Outbound Mean Value", width: 200 },
  ];

  // Calculate grand totals for all wallets
  const grandTotals: GrandTotals = wallets.reduce((acc, wallet) => {
    wallet.transactionsData.forEach((transaction) => {
      const chain = transaction.chain;
  
      if (!acc[chain]) {
        acc[chain] = {
          chain: chain,
          inbound_value: 0,
          inbound_count: 0,
          inbound_mean: 0,
          outbound_value: 0,
          outbound_count: 0,
          outbound_mean: 0,
        };
      }
  
      acc[chain].inbound_value += transaction.inbound_value;
      acc[chain].inbound_count += transaction.inbound_count;
      acc[chain].outbound_value += transaction.outbound_value;
      acc[chain].outbound_count += transaction.outbound_count;
    });
  
    return acc;
  }, {} as GrandTotals);

    // Calculate means
  Object.values(grandTotals).forEach((totals) => {
    totals.inbound_mean = totals.inbound_count > 0 ? totals.inbound_value / totals.inbound_count : 0;
    totals.outbound_mean = totals.outbound_count > 0 ? totals.outbound_value / totals.outbound_count : 0;
  });
  

  // Format grand totals into rows for DataGrid
  const rows = Object.values(grandTotals).map((row, index) => ({
    id: index,
    ...row,
  }));
  

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // ... other DataGrid properties as needed
      />
    </div>
  );
};

export default MultipleTransactionTable;
