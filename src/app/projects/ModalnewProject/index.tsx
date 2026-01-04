import { useCreateProjectMutation } from "@/state/api";
import Modal from "@/component/Modal";
import React, { useState } from "react";
import { start } from "repl";
import { is } from "date-fns/locale";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalnewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [ProjectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handlesubmit = async () => {
    if (!ProjectName || !startDate || !endDate) return;

    await createProject({
      name: ProjectName,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  const isfalidForm = () => {
    return ProjectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handlesubmit();
        }}
      >
        <input
          type="text"
          placeholder="Project Name"
          className={inputStyles}
          value={ProjectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          className={inputStyles}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-primary mt-4 flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none ${
            !isfalidForm() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isfalidForm() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalnewProject;
