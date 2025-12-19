import React, { useState } from "react";
import Header from "@/component/Header";
import { List, Clock, Table, Filter, Share2 } from "lucide-react";
import { Grid3x3 } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const projectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModelNewProjectOpen, setIsmodelNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      {/* Model New Project */}
      <div className="pt-6 pb-4 lg:pt-8 lg:pb-6"></div>
      <div>
        <Header name="Project design Development" />
      </div>
      {/* Tabs */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border-y border-gray-200 pt-2 pb-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-dark-2 dark:bg-dark-bg-2 rounded-md border py-1 pr-4 pl-10 focus:outline-none dark:text-white"
            />
            <Grid3x3 className="absolute top-2 left-3 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-px after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-500 dark:hover:text-white ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default projectHeader;
