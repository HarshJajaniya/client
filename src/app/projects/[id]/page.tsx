"use client";

import React, { useState, use } from "react";
import ProjectHeader from "@/app/projects/projectHeader";
import Board from "@/app/projects/BroadView";
import List from "@/app/projects/ListView";
import Timeline from "../TimelineView";
import TableView from "../TableView";
import ModalNewTask from "@/component/ModalNewTask";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Project(props: Props) {
  // ⬅️ unwrap the Promise
  const { id } = use(props.params);

  const [activeTab, setActiveTab] = useState("Board");
  const [ismodelTaskOpen, setIsmodalTaskOpen] = useState(false);
  const [taskRenderKey, setTaskRenderKey] = useState(0);

  return (
    <div>
      <ModalNewTask
        isOpen={ismodelTaskOpen}
        onClose={() => setIsmodalTaskOpen(false)}
        id={id}
        onTaskCreated={() => setTaskRenderKey((prev) => prev + 1)}
      />
      <ProjectHeader id={id} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board
          key={`board-${taskRenderKey}`}
          id={id}
          setIsModelNewTaskOpen={setIsmodalTaskOpen}
        />
      )}
      {activeTab === "List" && (
        <List
          key={`list-${taskRenderKey}`}
          id={id}
          setIsModelNewTaskOpen={setIsmodalTaskOpen}
        />
      )}
      {activeTab === "Timeline" && (
        <Timeline
          key={`timeline-${taskRenderKey}`}
          id={id}
          setIsModelNewTaskOpen={setIsmodalTaskOpen}
        />
      )}
      {activeTab === "Table" && (
        <TableView
          key={`table-${taskRenderKey}`}
          id={id}
          setIsModalNewTaskOpen={setIsmodalTaskOpen}
        />
      )}
    </div>
  );
}
