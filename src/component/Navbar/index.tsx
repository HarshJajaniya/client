"use client";

import { Search, Settings, Sun, Moon, Menu, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setisSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarcollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkmode);

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to login page or perform other actions after sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (!currentUser) return null;
  const currentUserDetials = currentUser?.userDetails;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❗ Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6" />
    );
  }

  return (
    <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search Bar */}
      <div className="flex items-center gap-8">
        {!isSidebarcollapsed ? null : (
          <button
            onClick={() => dispatch(setisSidebarCollapsed(!isSidebarcollapsed))}
          >
            <Menu className="h-8 w-8 text-gray-700 dark:text-gray-200" />
          </button>
        )}
      </div>
      <div className="relative h-12 w-[350px]">
        <Search className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-black dark:text-white" />
        <input
          type="text"
          placeholder="Search..."
          className="dark:border-stroke-dark dark:bg-dark-bg-2 focus:ring-blue-primary h-full w-full rounded-lg border border-gray-300 bg-white py-4 pr-12 pl-6 text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:outline-none dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3 pr-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="dark:hover:bg-dark-bg-3 rounded-md p-2 transition hover:bg-gray-100"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </button>

        <Link
          href="/setting"
          className="dark:hover:bg-dark-bg-3 rounded-md p-2 hover:bg-gray-100"
        >
          <Settings className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Link>
        <div className="hidden items-center justify-between md:flex">
          <div className="align-center flex h-9 w-9 justify-center">
            {!!currentUserDetials?.profilePictureUrl ? (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetials?.profilePictureUrl}`}
                alt={currentUserDetials?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetials?.username}
          </span>
          <button
            className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
