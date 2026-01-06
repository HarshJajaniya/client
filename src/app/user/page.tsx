"use client";

import React from "react";
import Header from "@/component/Header";
import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={`https://nitrogen-bucket-1.s3.ap-south-1.amazonaws.com/${params.value}`}
          alt="Profile"
          className="h-9 w-9 rounded-full object-cover"
        />
      </div>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <div className="p-8">Loading users...</div>;
  }

  if (isError || !users) {
    return <div className="p-8">Error fetching users</div>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />

      <div className="mt-6" style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default Users;
