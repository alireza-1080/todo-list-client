'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const signUpResponse = await fetch(
        'http://localhost:3100/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
          }),
        }
      );

      const signUpResponseData = await signUpResponse.json();

      if (signUpResponse.status === 201) {
        toast.success(signUpResponseData.message);

        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else if (signUpResponse.status === 400) {
        toast.error(signUpResponseData.message);
      }
    } catch (error) {
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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

export default SignUpForm;
