"use client";

import { Search, Settings, Sun, Moon, Menu, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setisSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";

const Navbar = () => {
  /* =========================
     ALL HOOKS FIRST
  ========================= */

  const dispatch = useAppDispatch();
  const isSidebarcollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================
     SAFE EARLY RETURNS
  ========================= */

  if (!mounted) {
    return (
      <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6" />
    );
  }

  if (!currentUser) return null;

  const currentUserDetails = currentUser.userDetails;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  /* =========================
     JSX
  ========================= */

  return (
    <div className="dark:bg-dark-bg dark:border-stroke-dark flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-8">
        {isSidebarcollapsed && (
          <button
            onClick={() => dispatch(setisSidebarCollapsed(!isSidebarcollapsed))}
          >
            <Menu className="h-8 w-8 text-gray-700 dark:text-gray-200" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative h-12 w-[350px]">
        <Search className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="dark:bg-dark-bg-2 h-full w-full rounded-lg border px-6 pr-12 text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 pr-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="dark:hover:bg-dark-bg-3 rounded-md p-2 hover:bg-gray-100"
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
          <Settings className="h-6 w-6" />
        </Link>

        <div className="hidden items-center md:flex">
          {currentUserDetails?.profilePictureUrl ? (
            <Image
              src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails.profilePictureUrl}`}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          ) : (
            <User className="h-6 w-6" />
          )}

          <span className="mx-3">{currentUserDetails?.username}</span>

          <button
            onClick={handleSignOut}
            className="rounded bg-blue-500 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
