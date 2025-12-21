import React from "react";
import ResuablePriorityPage from "../resuablePriorityPage";
import { Priority } from "@/state/api";

const Urgent = () => {
  return <ResuablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
