'use client';

import SettingsForm from './SettingsForm';

export default function Settings() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <SettingsForm />
    </div>
  );
}
