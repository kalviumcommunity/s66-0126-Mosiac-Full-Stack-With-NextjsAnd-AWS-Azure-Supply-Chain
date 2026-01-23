"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Button from "../components/Button";

interface SettingsType {
  notifications: boolean;
  darkMode: boolean;
  privacy: string;
}

export default function SettingsForm(): React.ReactElement {
  const [settings, setSettings] = useState<SettingsType>({
    notifications: true,
    darkMode: false,
    privacy: "public",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Settings updated:", settings);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-md">
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700">Enable Notifications</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700">Dark Mode</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Privacy</label>
        <select
          name="privacy"
          value={settings.privacy}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  );
}
