'use client';

import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" className="w-full">Sign In</Button>
        <p className="text-center mt-4">
            Dont have an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
        </form>
    </div>
    );
}
