import React from "react";
import Link from "next/link";

export default function Home(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to climatrix</h1>
        <p className="text-xl text-gray-600 mb-8">
          Web app made for monitoring and analyzing the climate data.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Get Started
          </Link>
          <Link href="/about" className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded">
            Learn More
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">🚀 Fast Performance</h3>
          <p className="text-gray-600">
            Experience lightning-fast load times with Next.js optimization and server-side rendering.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">🔒 Secure</h3>
          <p className="text-gray-600">
            Your data is protected with industry-leading security standards and best practices.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">📱 Responsive</h3>
          <p className="text-gray-600">
            Works seamlessly on all devices with a fully responsive design powered by Tailwind CSS.
          </p>
        </div>
      </section>
    </div>
  );
}
