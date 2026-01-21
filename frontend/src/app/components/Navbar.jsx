'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link href="/dashboard" className="hover:text-gray-200">Dashboard</Link></li>
          <li><Link href="/profile" className="hover:text-gray-200">Profile</Link></li>
          <li><Link href="/about" className="hover:text-gray-200">About</Link></li>
          <li><Link href="/settings" className="hover:text-gray-200">Settings</Link></li>
          <li><Link href="/auth/login" className="hover:text-gray-200">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}
