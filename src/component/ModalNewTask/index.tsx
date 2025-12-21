import {
  Priority,
  Status,
  useCreateProjectMutation,
  useCreateTaskMutation,
} from "@/state/api";
import Modal from "@/component/Modal";
import React, { useState } from "react";
import { start } from "repl";
import { is } from "date-fns/locale";
import { Tags } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assigneeUserId, setAssigneeUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handlesubmit = async () => {
    if (
      !title ||
      !authorUserId ||
      !assigneeUserId ||
      !(id !== null || projectId)
    )
      return;

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      authorUserId: Number(authorUserId),
      assignedUserId: Number(assigneeUserId),
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
      projectId: id != null ? Number(id) : Number(projectId),
    });
  };

  const isfalidForm = () => {
    return (
      title && authorUserId && assigneeUserId && !(id !== null || projectId)
    );
  };

  const selectStyles = "mb-4 block w-full rounded border border-gray-300 p-2 ";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handlesubmit();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          className={inputStyles}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          className={inputStyles}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:gap-2 md:grid-cols-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => {
              setStatus(Status[e.target.value as keyof typeof Status]);
            }}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => {
              setPriority(Priority[e.target.value as keyof typeof Priority]);
            }}
          >
            <option value="">Select Status</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className={inputStyles}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:gap-2 md:grid-cols-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Author User ID"
          className={inputStyles}
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee User ID"
          className={inputStyles}
          value={assigneeUserId}
          onChange={(e) => setAssigneeUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            placeholder="ProjectId"
            className={inputStyles}
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`bg-blue-primary mt-4 flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none ${
            !isfalidForm() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isfalidForm() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
