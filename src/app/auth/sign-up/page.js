import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import SignUpForm from '../../../../components/SignUpForm';
import 'dotenv/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const SignUp = async () => {
  try {
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
      },
      { cache: 'no-store' }
    );

    if (authResponse.status === 200) {
      return redirect('/dashboard');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
