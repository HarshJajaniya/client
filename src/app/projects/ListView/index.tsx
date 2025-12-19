import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";
import Header from "@/component/Header";
import TaskCard from "@/component/TaskCard";

type Props = {
  id: string;
  setIsModelNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModelNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks</div>;
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Tasks List" />
      </div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
