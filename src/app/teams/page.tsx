"use client";

import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import Header from "@/component/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";

const columns: GridColDef[] = [
  {
    field: "id", // ✅ FIX: match backend
    headerName: "Team ID",
    width: 100,
  },
  {
    field: "teamName",
    headerName: "Team Name",
    width: 200,
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 200,
  },
  {
    field: "productManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams} // ✅ backend data as-is
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 25]}
          showToolbar
          className={dataGridClassNames}
          sx={dataGridSxStyles}
        />
      </div>
    </div>
  );
};

export default Teams;
