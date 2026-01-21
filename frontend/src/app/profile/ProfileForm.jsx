'use client';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useState } from 'react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-md">
      <FormInput label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
      <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      <FormInput label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full border rounded px-3 py-2" rows="4" />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}
