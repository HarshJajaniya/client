"use client";
import { useSearchQuery } from "@/state/api";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import Header from "@/component/Header";
import TaskCard from "@/component/TaskCard";
import ProjectCard from "@/component/ProjectCard";
import UserCard from "@/component/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery({ query: searchTerm }, { skip: searchTerm.length < 3 });

  // ✅ Debounced setter (NOT event-based)
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleClear = () => {
    debouncedSearch.cancel(); // cancel pending calls
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="p-8">
      <Header name="Search" isSmalltext />

      <div className="relative mb-6 w-1/2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects, tasks, users..."
          className="w-full rounded border p-3 pr-10 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-6">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading results</p>}

        {!isLoading && !isError && searchResults && (
          <>
            {/* Tasks */}
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <>
                <h2 className="text-lg font-semibold">Tasks</h2>
                {searchResults.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </>
            )}

            {/* Projects */}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <>
                <h2 className="text-lg font-semibold">Projects</h2>
                {searchResults.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </>
            )}

            {/* Users */}
            {searchResults.users && searchResults.users.length > 0 && (
              <>
                <h2 className="text-lg font-semibold">Users</h2>
                {searchResults.users.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
