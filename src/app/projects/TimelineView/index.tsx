"use client";

import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, ViewMode, Gantt } from "gantt-task-react";
import { useTheme } from "next-themes";
import "gantt-task-react/dist/index.css";

type Props = {
  id: string;
  setIsModelNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = ({ id, setIsModelNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({
    projectId: Number(id),
  });

  const { theme } = useTheme(); // ThemeProvider (used only for container)
  const isDark = theme === "dark";

  const [displayOption, setDisplayOption] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate!),
        end: new Date(task.dueDate!),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems, // ✅ IMPORTANT
        progress: task.points ? Math.min((task.points / 10) * 100, 100) : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="font-bold">Project Task Timeline</h1>

        <div className="inline-block w-64">
          <select
            className="dark:bg-dark-bg-2 dark:border-stroke-dark block w-full rounded border border-gray-300 bg-white px-4 py-2 pr-8 text-black shadow focus:outline-none dark:text-gray-200"
            value={displayOption.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div
        className={`overflow-hidden rounded-md shadow ${
          isDark ? "bg-dark-bg-2" : "bg-white"
        }`}
      >
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOption}
            columnWidth={displayOption.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            /* ✅ SINGLE COLOR – WORKS IN BOTH MODES */
            barBackgroundColor="#3b82f6"
            barProgressColor="#1d4ed8"
            barProgressSelectedColor="#1e40af"
          />
        </div>

        <div className="px-4 pt-1 pb-5">
          <button
            className="flex items-center rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            onClick={() => setIsModelNewTaskOpen(true)}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
