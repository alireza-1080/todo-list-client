import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import 'dotenv/config';
import Image from 'next/image';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

const Home = async () => {
  const authToken = (await cookies()).get('auth-token')?.value;

  let authResponse;

  try {
    authResponse = await fetch(`${baseUrl}/auth/is-logged-in`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }

  if (authResponse.status === 200) {
    return redirect('/dashboard');
  }

  if (authResponse.status === 400) {
    return redirect('/auth');
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-green-400 to-blue-500 flex justify-center items-center">
      <Image
        height={400}
        width={400}
        src={'/to-do-list.png'}
        alt="todo-list"
      ></Image>
    </div>
  );
};

export default Home;
