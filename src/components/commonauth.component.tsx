'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export interface ISubmitFunction {
  email: string;
  password: string;
}

export default function CommonAuthComponent({
  type,
  handleSubmit,
}: {
  type: 'register' | 'login';
  handleSubmit: ({ email, password }: ISubmitFunction) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ email, password });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black bg-opacity-100">
      <div className="backdrop-blur-md border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-lg">
        {/* Dotted background layer */}
        {/* <div className="absolute inset-0 bg-dotted-white" /> */}
        <h1 className="text-white text-2xl font-bold mb-6 text-center">
          {type == 'register' ? 'Register' : 'Login'}
        </h1>
        <form className="relative z-10 flex flex-col gap-7" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            {type == 'register' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-white text-center mt-4">
          {type == 'register' ? 'Already' : 'Don&apos;t'} have an account?{' '}
          <Link
            href={`/auth/${type == 'register' ? 'login' : 'register'}`}
            className="text-blue-400 hover:underline font-semibold"
          >
            {type == 'register' ? 'Login' : 'Register'}
          </Link>
        </p>
      </div>
    </main>
  );
}
