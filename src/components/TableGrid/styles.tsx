import React from "react";
import { colors } from "../../shared/theme";

export const tableContainer = {
  display: "flex",
  flex: 1,
  height: "calc(100vh - 248px)",
  width: "calc(100vw - 200px)",
};

export const table = {
  border: 0,
  borderRadius: "4px",
  "& .super-app-theme--header": {
    backgroundColor: colors.primary_lightest,
    border: colors.primary_lightest,
    color: colors.neutral_darkest,
    padding: "20px",
    height: "10px",
  },
  "& .MuiDataGrid-cell": {
    padding: "25px",
  },
  "& .MuiDataGrid-iconSeparator": {
    color: colors.primary_lightest,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "700px",
  },
};
