import React from "react";
import { Task } from "@/state/api";
import Image from "next/image";
import { format } from "date-fns";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const tagsArray =
    typeof task.tags === "string"
      ? task.tags.split(",").map((tag) => tag.trim())
      : [];

  return (
    <div className="dark:border-dark-border dark:bg-dark-bg-2 mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Attachment Preview */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={`https://nitrogen-bucket-1.s3.ap-south-1.amazonaws.com/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="h-40 w-full object-cover"
          />
        </div>
      )}

      {/* Title + ID */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <span className="text-xs text-gray-400">#{task.id}</span>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
        {task.description || "No description provided."}
      </p>

      {/* Status & Priority */}
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {task.status}
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
          {task.priority}
        </span>
      </div>

      {/* Tags */}
      {tagsArray.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {tagsArray.map((tag, index) => (
            <span
              key={index}
              className="dark:bg-dark-bg-3 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="mb-4 text-xs text-gray-400">No tags</p>
      )}

      {/* Divider */}
      <div className="dark:bg-dark-border my-3 h-px bg-gray-100" />

      {/* Dates */}
      <div className="mb-3 flex justify-between text-xs text-gray-500">
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Start:
          </span>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "N/A"}
        </span>
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Due:
          </span>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "N/A"}
        </span>
      </div>

      {/* Author & Assignee */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Author:
          </span>{" "}
          {task.author?.username || "—"}
        </span>
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Assignee:
          </span>{" "}
          {task.assignee?.username || "—"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
