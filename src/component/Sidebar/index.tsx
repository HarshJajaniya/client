"use client";

import Image from "next/image";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  HomeIcon,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  User2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Home from "@/app/page";
import { setisSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

const Sidebar = () => {
  const [showProjects, setshowProjects] = useState(false);
  const [showPriorityList, setshowPriorityList] = useState(false);

  const { data: projects } = useGetProjectsQuery();
  console.log("PROJECTS FROM API:", projects);

  const dispatch = useAppDispatch();
  const isSidebarcollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const sidebarclassName = `fixed overflow-y-auto flex flex-col h-full justify-between shadow-xl transition-all duration-300 bg-white dark:bg-dark-bg z-40 ${
    isSidebarcollapsed ? "w-0 hidden" : "w-64"
  }`;
  return (
    <div className={sidebarclassName}>
      <div className="flex w-full flex-col justify-start">
        {/* Top Header */}
        <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
            EDLIST
          </div>
          {isSidebarcollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setisSidebarCollapsed(!isSidebarcollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </button>
          )}
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>
        <nav className="z-10 w-full flex-1 space-y-1 px-4 py-6">
          {/* Navigation Links */}
          <SidebarLink href="/" icon={HomeIcon} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/setting" icon={Settings} label="Setting" />
          <SidebarLink href="/user" icon={User} label="User" />
          <SidebarLink href="/team" icon={Users} label="Team" />
        </nav>
        {/* Projects Section */}
        <button
          onClick={() => setshowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {/* Project list */}

        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              href={`/projects/${project.id}`}
              icon={Briefcase}
              label={project.name}
            />
          ))}
        {/* Priority list */}
        <button
          onClick={() => setshowPriorityList((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriorityList ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {showPriorityList && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  //   iscollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  //   iscollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const widthscreen = typeof window !== "undefined" ? window.innerWidth : 1200;

  const dispatch = useAppDispatch();
  const isSidebarcollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <Link href={href} className="w-full">
      <div
        className={`dark:hover:bg-dark-bg-3 relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 ${
          isActive ? "dark:bg-dark-bg-3 bg-gray-200" : ""
        } justify-start px-6 py-3`}
      >
        {isActive && (
          <div className="dark:bg-blue-primary absolute left-0 h-full w-1 bg-blue-500" />
        )}

        <Icon className="h-8 w-8 text-gray-700 dark:text-gray-200" />

        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
