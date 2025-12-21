import React from "react";
import ResuablePriorityPage from "../resuablePriorityPage";
import { Priority } from "@/state/api";

const Backlog = () => {
  return <ResuablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
