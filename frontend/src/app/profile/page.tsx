"use client";

import React from "react";
import ProfileForm from "./ProfileForm";

export default function Profile(): React.ReactElement {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <ProfileForm />
    </div>
  );
}
