import React from 'react';
import SignInForm from '../../../../components/SignInForm.js'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const SignIn = async () => {

    const authToken = (await cookies()).get('auth-token')?.value;

    const authResponse = await fetch(
        'http://localhost:3100/api/v1/auth/is-logged-in',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });

    if (authResponse.status === 200) {
        return redirect('/dashboard');
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
            <SignInForm />
        </div>
    );
};

export default SignIn;

// {
//     <div className="w-full min-h-screen bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 flex justify-center items-center"></div>
// }