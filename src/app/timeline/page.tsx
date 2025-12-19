"use client";

import { useGetProjectsQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, ViewMode, Gantt } from "gantt-task-react";
import { useTheme } from "next-themes";
import "gantt-task-react/dist/index.css";
import Header from "@/component/Header";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const { theme } = useTheme(); // ThemeProvider (used only for container)
  const isDark = theme === "dark";

  const [displayOption, setDisplayOption] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate!),
        end: new Date(project.endDate!),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems, // ✅ IMPORTANT
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);
  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects) return <div>Error fetching Projects...</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" isSmalltext />

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
      </header>

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
      </div>
    </div>
  );
};

export default Timeline;
