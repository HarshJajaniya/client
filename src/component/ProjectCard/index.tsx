import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
        {project.name}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
        {project.description || "No description provided."}
      </p>

      {/* Divider */}
      <div className="mb-3 h-px bg-gray-100" />

      {/* Dates */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          <span className="font-medium text-gray-700">Start:</span>{" "}
          {project.startDate
            ? new Date(project.startDate).toLocaleDateString()
            : "—"}
        </span>
        <span>
          <span className="font-medium text-gray-700">End:</span>{" "}
          {project.endDate
            ? new Date(project.endDate).toLocaleDateString()
            : "—"}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
