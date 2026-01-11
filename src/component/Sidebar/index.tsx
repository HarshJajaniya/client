"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  Users,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setisSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";

/* =========================
   SIDEBAR
========================= */

const Sidebar = () => {
  /* ✅ ALL HOOKS FIRST */
  const [showProjects, setShowProjects] = useState(false);
  const [showPriorityList, setShowPriorityList] = useState(false);

  const { data: projects } = useGetProjectsQuery();
  const { data: currentUser } = useGetAuthUserQuery({});

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  /* ✅ SAFE EARLY RETURN (after hooks) */
  if (!currentUser) return null;

  const currentUserDetails = currentUser.userDetails;

  const sidebarClassName = `fixed overflow-y-auto flex flex-col h-full justify-between shadow-xl transition-all duration-300 bg-white dark:bg-dark-bg z-40 ${
    isSidebarCollapsed ? "w-0 hidden" : "w-64"
  }`;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={sidebarClassName}>
      <div className="flex w-full flex-col justify-start">
        {/* Header */}
        <div className="dark:border-stroke-dark flex h-14 items-center justify-between border-b px-6">
          <span className="text-xl font-bold">Nitrogen</span>
          {!isSidebarCollapsed && (
            <button
              onClick={() =>
                dispatch(setisSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Team */}
        <div className="dark:border-stroke-dark flex items-center gap-5 border-y px-8 py-4">
          <Image
            src="https://nitrogen-bucket-1.s3.ap-south-1.amazonaws.com/logo-1.png"
            alt="Team"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-bold">My Team</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <LockIcon className="h-4 w-4" />
              Private
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          <SidebarLink href="/" icon={HomeIcon} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/setting" icon={Settings} label="Setting" />
          <SidebarLink href="/user" icon={User} label="User" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>

        {/* Projects */}
        <button
          onClick={() => setShowProjects((p) => !p)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          Projects
          {showProjects ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              href={`/projects/${project.id}`}
              icon={Briefcase}
              label={project.name}
            />
          ))}

        {/* Priority */}
        <button
          onClick={() => setShowPriorityList((p) => !p)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          Priority
          {showPriorityList ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showPriorityList && (
          <>
            <SidebarLink
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
            />
          </>
        )}
      </div>

      {/* User Footer (mobile) */}
      <div className="px-8 py-4 md:hidden">
        <div className="flex items-center gap-3">
          {currentUserDetails?.profilePictureUrl ? (
            <Image
              src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <User className="h-6 w-6" />
          )}
          <span>{currentUserDetails?.username}</span>
          <button
            onClick={handleSignOut}
            className="ml-auto rounded bg-blue-500 px-3 py-1 text-xs text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

/* =========================
   SIDEBAR LINK
========================= */

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="block">
      <div
        className={`dark:hover:bg-dark-bg-3 relative flex items-center gap-3 px-6 py-3 hover:bg-gray-100 ${
          isActive ? "dark:bg-dark-bg-3 bg-gray-200" : ""
        }`}
      >
        {isActive && <div className="absolute left-0 h-full w-1 bg-blue-500" />}
        <Icon className="h-6 w-6" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};
