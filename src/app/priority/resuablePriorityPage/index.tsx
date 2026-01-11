"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/component/Header";
import ModalNewTask from "@/component/ModalNewTask";
import TaskCard from "@/component/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";
import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 120 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 100 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState<"list" | "table">("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  /* ------------------ USER ------------------ */
  const { data: currentUser } = useGetAuthUserQuery({});
  const userId = currentUser?.userDetails?.userId ?? null;

  /* ------------------ TASKS ------------------ */
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  /* ------------------ FILTER BY PRIORITY ------------------ */
  const filteredTasks: Task[] =
    tasks?.filter((task) => task.priority === priority) ?? [];

  /* ------------------ STATES ------------------ */

  if (isLoading) {
    return <div className="m-5 p-4">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="m-5 p-4 text-red-500">Error fetching tasks</div>;
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="m-5 p-4">
        <Header name={`${priority} Tasks`} />
        <div className="mt-10 text-center text-gray-500">
          No {priority} tasks 🎉
        </div>
      </div>
    );
  }

  /* ------------------ UI ------------------ */

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />

      <Header
        name={`${priority} Tasks`}
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />

      {/* View Toggle */}
      <div className="mb-4 flex">
        <button
          className={`rounded-l px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-r px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="z-0 w-full">
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.id}
            className={dataGridClassNames}
            sx={dataGridSxStyles}
          />
        </div>
      )}
    </div>
  );
};

export default ReusablePriorityPage;
