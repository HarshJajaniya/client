"use client";

import React, { useState, use } from "react";
import ProjectHeader from "@/app/projects/projectHeader";
import Board from "@/app/projects/BroadView";
import List from "@/app/projects/ListView";
import Timeline from "../TimelineView";

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
    </div>
  );
}
