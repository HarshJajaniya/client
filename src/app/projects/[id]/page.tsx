"use client";

import React, { useState, use } from "react";
import ProjectHeader from "@/app/projects/projectHeader";
import Board from "@/app/projects/BroadView";

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
    </div>
  );
}
