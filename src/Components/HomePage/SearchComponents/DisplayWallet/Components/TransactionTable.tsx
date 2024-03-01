import * as React from "react";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRenderCellParams
} from "@mui/x-data-grid";
import "../displaywallet.css";
import MyContext from "../DisplayWallet";
import { format } from "path";
import { formGroupClasses } from "@mui/material";

interface TransactionTableProps {
  walletData: {
    transactions: any[];
  };
  address: string;
}


const ScrollableCell: React.FC<GridRenderCellParams> = (params) => {
  return (
    <div style={{ width: '100%', overflow: 'auto', whiteSpace: 'nowrap' }}>
      {params.value}
    </div>
  );
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  walletData,
  address,
}) => {
  const columns: GridColDef[] = [
    {
      field: "from_address",
      headerName: "From Address",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
    {
      field: "to_address",
      headerName: "To Address",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
    {
      field: "value",
      headerName: "Value",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
    {
      field: "decimal_value",
      headerName: "Decimal Value",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
    {
      field: "block_timestamp",
      headerName: "Block Timestamp (+0)",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
    {
      field: "block_hash",
      headerName: "Block Hash",
      flex: 1,
      headerClassName: "transactionHeader",
      renderCell: ScrollableCell, 
    },
  ];


  const rows = walletData.transactions.map((transaction, index) => ({
    id: index,
    from_address: transaction.from_address,
    to_address: transaction.to_address,
    value: transaction.value,
    decimal_value: transaction.decimal_value,
    block_timestamp: transaction.block_timestamp,
    block_hash: transaction.block_hash,
  }));

  return (
    <div className="" style={{ height: 500, width: "650px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowClassName={(params) =>
          `${params.row.from_address === address.toLowerCase() ? "outbound" : "inbound"}`
        }
        style={{
          backgroundClip: "content-box",
          borderRadius: "20px",
          textOverflow: "ellipsis",
        }}
        sx={[
          {
            border: 5,
            borderColor: "#EB5763",
            width: "auto",
          },
          {
            "& .MuiDataGrid-row:hover": {
              bgcolor: "rgb(240, 240, 255)",
            },
          },
          {
            "& .MuiDataGrid-cell:hover": {
              bgcolor: "rgb(239, 239, 255)",
            },
          },
          {
            "& .inbound .Mui-selected": {
              bgcolor: "rgb(230, 245, 230) !important",
            },
            "& .inbound .Mui-selected:hover": {
              bgcolor: "rgb(225, 245, 225) !important",
            },
          },
          {
            "& .outbound .Mui-selected": {
              bgcolor: "rgb(245, 230, 230) !important",
            },
            "& .outbound .Mui-selected:hover": {
              bgcolor: "rgb(245, 225, 225) !important",
            },
          },
          {
            "& .Mui-hovered": {
              bgcolor: "rgb(232, 232, 232)",
            },
          },
          {
            "& .MuiDataGrid-columnHeader": {
              fontWeight: "bold !important",
              bgcolor: "#EB5763",
            },
          },
        ]}
      />
    </div>
  );
};

export default TransactionTable;
