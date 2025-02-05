import React from 'react';
import SingleTodo from './SingleTodo';

const AllTodos = ({ id, todos }) => {
  return (
    <div className="bg-white/20 backdrop-blur-3xl w-[600px] h-fit max-h-[400px] mt-52 p-5 rounded-lg shadow-lg overflow-auto scrollbar-hide">
      <div className='flex flex-col gap-5'>
        {todos.map((todo) => (
          <SingleTodo key={todo._id} todo={todo} id={id} />
        ))}
      </div>
    </div>
  );
};

export default AllTodos;
