import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const Home = async () => {
  const authToken = (await cookies()).get('auth-token')?.value;
  console.log(authToken);
  const authResponse = await fetch(
    'http://localhost:3100/api/v1/auth/is-logged-in',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const authResponseData = await authResponse.json();

  if (authResponse.status === 200) {
    return redirect('/dashboard');
  }

  if (authResponse.status === 400) {
    return redirect('/auth');
  }

  return <div>Home</div>;
};

export default Home;
