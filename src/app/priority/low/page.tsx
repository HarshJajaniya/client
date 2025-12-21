import React from "react";
import ResuablePriorityPage from "../resuablePriorityPage";
import { Priority } from "@/state/api";

const Low = () => {
  return <ResuablePriorityPage priority={Priority.Low} />;
};

export default Low;
