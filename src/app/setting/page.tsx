"use client";

import Header from "@/component/Header";
import React, { useState } from "react";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userSettings, setUserSettings] = useState({
    username: "username",
    email: "email@gmail.com",
    teamName: "Nitrogen",
    roleName: "Developer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);

    // 🔹 Later: API call
    // await updateUserSettings(userSettings)
    console.log("Saved settings:", userSettings);
  };

  const labelStyle = "block text-sm font-medium text-gray-600";
  const inputStyle =
    "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none";
  const valueStyle =
    "mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm";

  return (
    <div className="max-w-xl p-8">
      <Header name="Settings" />

      <div className="mb-6 flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {[
          { label: "Username", key: "username" },
          { label: "Email", key: "email" },
          { label: "Team Name", key: "teamName" },
          { label: "Role Name", key: "roleName" },
        ].map((field) => (
          <div key={field.key}>
            <label className={labelStyle}>{field.label}</label>

            {isEditing ? (
              <input
                type="text"
                name={field.key}
                value={userSettings[field.key as keyof typeof userSettings]}
                onChange={handleChange}
                className={inputStyle}
              />
            ) : (
              <div className={valueStyle}>
                {userSettings[field.key as keyof typeof userSettings]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
