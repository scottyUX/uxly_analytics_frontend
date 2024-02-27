import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface TransactionDetailsTableProps {
  walletData: {
    transactionsData: any[];
  };
}

const TransactionDetailsTable: React.FC<TransactionDetailsTableProps> = ({
  walletData,
}) => {
  const columns: GridColDef[] = [
    { field: "chain", headerName: "Chain", width: 150 },
    { field: "inbound_value", headerName: "Inbound Value", width: 200 },
    { field: "inbound_count", headerName: "Inbound Count", width: 150 },
    { field: "inbound_mean", headerName: "Inbound Mean Value", width: 200 },
    { field: "outbound_value", headerName: "Outbound Value", width: 200 },
    { field: "outbound_count", headerName: "Outbound Count", width: 150 },
    { field: "outbound_mean", headerName: "Outbound Mean Value", width: 200 },
  ];

  const rows = walletData.transactionsData.map((chainData, index) => ({
    id: index,
    chain: chainData.chain,
    inbound_value: chainData.inbound_value,
    inbound_count: chainData.inbound_count,
    inbound_mean: chainData.inbound_mean,
    outbound_value: chainData.outbound_value,
    outbound_count: chainData.outbound_count,
    outbound_mean: chainData.outbound_mean,
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

export default TransactionDetailsTable;
