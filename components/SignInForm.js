'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch(
        'http://localhost:3100/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier, password }),
          credentials: 'include',
        }
      );

      const loginResponseData = await loginResponse.json();

      if (loginResponse.status === 200) {
        toast.success(loginResponseData.message);

        setIdentifier('');
        setPassword('');

        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else if (loginResponse.status === 400) {
        toast.error(loginResponseData.message);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Fetch error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col gap-8 justify-around w-96"
    >
      <div className="mb-4">
        <input
          type="text"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email / Username"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;