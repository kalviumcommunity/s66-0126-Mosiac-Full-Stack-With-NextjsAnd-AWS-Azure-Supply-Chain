'use client';

import ProfileForm from './ProfileForm';

export default function Profile() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <ProfileForm />
    </div>
  );
}
