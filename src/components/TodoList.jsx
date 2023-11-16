import React from 'react'
import Todo from './Todo';

const TodoList = ({ todos }) => {
  // console.log(todos);
  // console.log(todos[0]);
  // console.log(todos[1]);
  // console.log(todos[2]);
  return (
    <div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}

    </div>
  );
};

export default TodoList;
