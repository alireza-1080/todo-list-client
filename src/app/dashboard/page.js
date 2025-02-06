import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardHeader from '../../../components/DashboardHeader';
import AllTodos from '../../../components/AllTodos';
import 'dotenv/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Dashboard = async () => {
  const authToken = (await cookies()).get('auth-token')?.value;

  let authResponse;

  try{
    authResponse = await fetch(`${baseUrl}/auth/is-logged-in`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }, { cache: 'no-store' });
  } catch (error) {
    return redirect('/auth');
  }

  if (authResponse.status !== 200) {
    return redirect('/auth');
  }

  let userInfoResponse;

  try{
    userInfoResponse = await fetch(`${baseUrl}/auth/get-me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    return redirect('/auth');
  }

  const userInfo = await userInfoResponse.json();

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 flex justify-center">
      <DashboardHeader
        id={userInfo.user._id}
        firstName={userInfo.user.firstName}
        lastName={userInfo.user.lastName}
      />
      <AllTodos id={userInfo.user._id} todos={userInfo.user.todos} />
    </div>
  );
};

export default Dashboard;
