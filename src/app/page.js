import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import "dotenv/config";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

const Home = async () => {
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

  if (authResponse.status === 400) {
    return redirect('/auth');
  }

  return <div>Home</div>;
};

export default Home;
