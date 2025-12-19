import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, ViewMode, Gantt } from "gantt-task-react";
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
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOption, setDisplayOption] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const isDarkMode = false; // Replace with your actual dark mode state

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate!),
        end: new Date(task.dueDate!),
        name: task.title,
        id: `Task-${task.id}`,
        type: "project" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
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
        <h1 className="me-2 font-bold">Project Task Timeline</h1>
        <div className="inline-block w-64">
          <select
            className="focus:shadow-outline appreance-none block w-full rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:shadow-gray-500 focus:outline-none"
            value={displayOption.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOption}
            columnWidth={ViewMode.Month === displayOption.viewMode ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pt-1 pb-5">
          <button
            className="flex items-center rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            onClick={() => setIsModelNewTaskOpen(true)}
          >
            Add Task
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
