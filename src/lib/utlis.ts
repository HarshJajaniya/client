import { SxProps, Theme } from "@mui/material/styles";


export const dataGridClassNames =
  "border shadow";

export const dataGridSxStyles: SxProps<Theme> = {
  border: "none",

  bgcolor: (theme) => theme.palette.background.paper,
  color: (theme) => theme.palette.text.primary,

  "& .MuiDataGrid-columnHeaders": {
    color: (theme) => theme.palette.text.secondary,
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,

    '& [role="row"] > *': {
      backgroundColor: (theme) => theme.palette.background.default,
      borderColor: (theme) => theme.palette.divider,
    },
  },

  "& .MuiIconButton-root": {
    color: (theme) => theme.palette.text.secondary,
  },

  "& .MuiTablePagination-root": {
    color: (theme) => theme.palette.text.secondary,
  },

  "& .MuiTablePagination-selectIcon": {
    color: (theme) => theme.palette.text.secondary,
  },

  "& .MuiDataGrid-cell": {
    border: "none",
  },

  "& .MuiDataGrid-row": {
    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  },

  "& .MuiDataGrid-withBorderColor": {
    borderColor: (theme) => theme.palette.divider,
  },

  "& .MuiDataGrid-row:hover": {
    backgroundColor: (theme) => theme.palette.action.hover,
  },
};
