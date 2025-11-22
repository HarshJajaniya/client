"use client";

import Image from "next/image";
import { LockIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="dark:bg-dark-bg fixed z-40 flex h-full w-64 flex-col bg-white shadow-xl transition-all duration-300">
      {/* Top Header */}
      <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
          EDLIST
        </div>
      </div>

      {/* Team Section */}
      <div className="dark:border-stroke-dark flex items-center gap-5 border-y border-gray-200 px-8 py-4">
        <Image
          className="rounded-full"
          src="/logo.png"
          alt="Team"
          width={40}
          height={40}
        />

        <div>
          <h3 className="text-md font-bold tracking-wide text-gray-800 dark:text-gray-200">
            My Team
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Private</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
