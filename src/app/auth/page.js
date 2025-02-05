import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import 'dotenv/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Auth = async () => {
  const authToken = (await cookies()).get('auth-token')?.value;

  const authResponse = await fetch(
    `${baseUrl}/auth/is-logged-in`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (authResponse.status === 200) {
    return redirect('/dashboard');
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-green-400 to-blue-500 flex justify-center items-center">
      <div className="w-80 h-80 bg-white/20 rounded-lg shadow-lg flex flex-col justify-around gap-10 backdrop-blur-md p-8">
        <Link className="flex w-full" href={'/auth/sign-in'}>
          <button className="hover:bg-blue-700 bg-blue-600 transition-all text-white font-bold text-xl py-4 rounded-md w-full">
            Sign in
          </button>
        </Link>
        <Link className="flex w-full" href={'/auth/sign-up'}>
          <button className="hover:bg-blue-700 bg-blue-600 transition-all text-white font-bold text-xl py-4 rounded-md w-full">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
