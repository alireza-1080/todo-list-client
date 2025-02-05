'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const DashboardHeader = ({ id, firstName, lastName }) => {
  const router = useRouter();

  const [isAddTodoOpen, setIsAddTodoOpen] = React.useState(false);
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const addTodoTab = React.useRef(null);

  const handleLogout = async () => {
    try {
      const logoutResponse = await fetch(
        'http://localhost:3100/api/v1/auth/logout',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const logoutResponseData = await logoutResponse.json();

      if (logoutResponse.status === 200) {
        toast.success(logoutResponseData.message);

        router.push('/auth');
      } else {
        toast.error(logoutResponseData.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();

    try {
      const createTodoResponse = await fetch(
        'http://localhost:3100/api/v1/todo/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTodoTitle, userId: id }),
        }
    );
    
    const createTodoResponseData = await createTodoResponse.json();

    if (createTodoResponse.status === 201) {
        toast.success(createTodoResponseData.message);
        setNewTodoTitle('');
        setIsAddTodoOpen(false);

            router.push('/dashboard');

        } else {
        toast.error(createTodoResponseData.message);
        }

    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    addTodoTab.current.classList.toggle('translate-y-[-140%]', !isAddTodoOpen);
  }, [isAddTodoOpen]);

  return (
    <div className="w-[600px] h-32 bg-white/20 backdrop-blur-3xl rounded-lg shadow-md fixed top-10 flex justify-between items-center px-4 transition z-50">
      <div className="flex gap-1 grow">
        <h2 className="text-xl font-bold">{firstName}</h2>
        <h2 className="text-xl font-bold">{lastName}</h2>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setIsAddTodoOpen(true)}
          className="text-white grow bg-green-600 hover:bg-green-700 transition-all rounded-md px-4 py-2"
        >
          Add Todo
        </button>
        <button
          onClick={handleLogout}
          className="text-white grow bg-red-600 hover:bg-red-700 transition-all rounded-md px-4 py-2"
        >
          Log Out
        </button>
      </div>
      <div
        ref={addTodoTab}
        className="absolute top-0 left-0 h-full w-full rounded-lg bg-white  translate-y-[-140%] transition overflow-hidden"
      >
        <form className="bg-gray-800 w-full h-full flex gap-8 items-center p-8 pt-12">
          <div className="grow">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              required
              placeholder="Todo Title"
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
            onClick={handleCreateTodo}
          >
            Add
          </button>
        </form>

        <Image
          onClick={() => setIsAddTodoOpen(false)}
          src={'/close.png'}
          width={100}
          height={100}
          alt="close"
          className="absolute top-3 right-3 w-5 h-5 cursor-pointer"
        ></Image>
      </div>
    </div>
  );
};

export default DashboardHeader;
