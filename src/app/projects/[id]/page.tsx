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

  return (
    <div>
      <ModalNewTask
        isOpen={ismodelTaskOpen}
        onClose={() => setIsmodalTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModelNewTaskOpen={setIsmodalTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModelNewTaskOpen={setIsmodalTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModelNewTaskOpen={setIsmodalTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsmodalTaskOpen} />
      )}
    </div>
  );
}
