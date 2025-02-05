'use client';
import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SingleTodo = ({ todo }) => {
  const router = useRouter();

  const checkIcon = React.useRef(null);
  const editTodoTab = React.useRef(null);

  const [title, setTitle] = React.useState(todo.title);
  const [isCompleted, setIsCompleted] = React.useState(todo.isCompleted);
  const [isEditTabOpen, setIsEditTabOpen] = React.useState(false);
  const [EditedTitle, setEditedTitle] = React.useState(todo.title);

  const handleChangeStatus = async () => {
    
    try {
      const changeStatusResponse = await fetch(
        `http://localhost:3100/api/v1/todo/update-status/${todo._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const changeStatusResponseData = await changeStatusResponse.json();

      if (changeStatusResponse.status === 200) {
        toast.success(changeStatusResponseData.message);
        setIsCompleted(!isCompleted);
      } else {
        toast.error(changeStatusResponseData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDeleteTodo = async () => {
   
    try {
      const deleteTodoResponse = await fetch(
        `http://localhost:3100/api/v1/todo/delete/${todo._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const deleteTodoResponseData = await deleteTodoResponse.json();

      if (deleteTodoResponse.status === 200) {
        toast.success(deleteTodoResponseData.message);

          router.push('/dashboard');
      } else {
        toast.error(deleteTodoResponseData.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleCloseEditTab = () => {
    setIsEditTabOpen(false);
    setEditedTitle(title);
  };

  const handleEditTodo = async (e) => {
    e.preventDefault()
    
  try {
    const editTodoResponse = await fetch(
      `http://localhost:3100/api/v1/todo/edit/${todo._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: EditedTitle})
      }
    );

    const editTodoResponseData = await editTodoResponse.json();

    if (editTodoResponse.status === 200) {
      toast.success(editTodoResponseData.message);
      setTitle(EditedTitle);
      setIsEditTabOpen(false);
    } else {
      toast.error(editTodoResponseData.message);
    }        
  } catch (error) {
    toast.error(error.message);
    console.error('Fetch error:', error);
  }
}

  React.useEffect(() => {
    checkIcon.current?.classList.toggle('opacity-1', isCompleted);
    checkIcon.current?.classList.toggle('opacity-0', !isCompleted);
  }, [isCompleted]);

  React.useEffect(() => {
    editTodoTab.current.classList.toggle('-translate-y-full', !isEditTabOpen);
  }, [isEditTabOpen]);

  return (
    <div
      key={todo._id}
      className="bg-gray-900 w-full py-2 transition rounded-lg shadow-lg px-4 flex justify-between items-center relative overflow-hidden"
    >
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleChangeStatus()}
          className="relative w-6 h-6 p1"
        >
          <Image
            ref={checkIcon}
            src={'/check.png'}
            alt="check"
            width={100}
            height={100}
            className="w-6 h-6 absolute bottom-[2px] right-[2px] opacity-0 transition duration-300"
          />
          <Image
            src={'/hula-hoop.png'}
            alt="hula-hoop"
            width={100}
            height={100}
            className="w-4 h-4"
          />
        </button>
        <h1 className="text-l px-4 py-3 text-white font-bold">{title}</h1>
      </div>
      <div className="flex gap-4">
        <button>
          <Image
            src={'/edit.png'}
            onClick={() => setIsEditTabOpen(true)}
            alt="edit"
            width={100}
            height={100}
            className="w-6 h-6"
          />
        </button>
        <button>
          <Image
            src={'/delete.png'}
            onClick={() => handleDeleteTodo()}
            alt="delete"
            width={100}
            height={100}
            className="w-6 h-6"
          />
        </button>
      </div>
      <div ref={editTodoTab} className="absolute top-0 left-0 h-full w-full rounded-lg bg-white  -translate-y-full transition overflow-hidden">
        <form className="bg-gray-800 w-full h-full flex gap-8 items-center p-8 py-2">
          <div className="grow">
            <input
              type="text"
              required
              value={EditedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Todo Title"
              className="w-full h-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            onClick={handleEditTodo}
            className="bg-green-500 text-white h-fit flex items-center py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Apply
          </button>
          <Image
            src={'/close.png'}
            onClick={handleCloseEditTab}
            width={100}
            height={100}
            alt="close"
            className="w-5 h-5 cursor-pointer"
          ></Image>
        </form>
      </div>
    </div>
  );
};

export default SingleTodo;
