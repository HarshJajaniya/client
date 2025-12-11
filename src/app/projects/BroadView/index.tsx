import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/api";
import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";

type BroadProps = {
  id: string;
  setIsModelNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
const Boardview = ({ id, setIsModelNewTaskOpen }: BroadProps) => {
  const numericId = Number(id);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: numericId }, { skip: isNaN(numericId) });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isNaN(numericId)) return <div>Loading project...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-6">
        {taskStatus.map((status) => {
          return (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks || []}
              moveTask={moveTask}
              setIsmodalTaskOpen={setIsModelNewTaskOpen}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

type taskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsmodalTaskOpen: (isOpen: boolean) => void;
};
const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsmodalTaskOpen,
}: taskColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => {
      moveTask(item.id, status);
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const taskCount = tasks.filter((task) => task.status === status).length;

  const statusColors: any = {
    "To Do": "#2563eb",
    "Work In Progress": "#f59e0b",
    "Under Review": "#eab308",
    Completed: "#10b981",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`!bg-[${statusColors[status]}] w-2 rounded-s-lg`}
          style={{ backgroundColor: statusColors[status] }}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Boardview;
