"use client";
import Header from "@/component/Header";
import React from "react";

const Settings = () => {
  const userSettings = {
    username: "Harsh Jajaniya",
    email: "email@gmail.com",
    teamName: "Nitrogen",
    roleName: "Developer",
  };

  const labelstyle = "block text-sm font-medium ";
  const textstyle = "mt-1 block w-full border border-gray-300";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelstyle}>Username</label>
          <div className={textstyle}>{userSettings.username}</div>
        </div>
        <div>
          <label className={labelstyle}>Email</label>
          <div className={textstyle}>{userSettings.email}</div>
        </div>
        <div>
          <label className={labelstyle}>Team Name</label>
          <div className={textstyle}>{userSettings.teamName}</div>
        </div>
        <div>
          <label className={labelstyle}>Role Name</label>
          <div className={textstyle}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
