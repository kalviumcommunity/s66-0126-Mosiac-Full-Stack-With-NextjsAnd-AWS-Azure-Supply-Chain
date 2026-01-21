'use client';

import Button from '../components/Button';
import { useState } from 'react';

export default function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    privacy: 'public',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings updated:', settings);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-md">
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} className="mr-2" />
          <span className="text-gray-700">Enable Notifications</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} className="mr-2" />
          <span className="text-gray-700">Dark Mode</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Privacy</label>
        <select name="privacy" value={settings.privacy} onChange={handleChange} className="w-full border rounded px-3 py-2">
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="friends">Friends Only</option>
        </select>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  );
}
