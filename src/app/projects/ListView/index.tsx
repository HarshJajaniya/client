import { useGetTasksQuery } from "@/state/api";
import React from "react";

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
  if (error) return <div>Error loading tasks</div>;
  return <div>ListView</div>;
};

export default ListView;
