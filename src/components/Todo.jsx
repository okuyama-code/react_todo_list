import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className='Todo'>
      <label>
        <input type="checkbox" checked={task.completed} readOnly onClick={() => toggleComplete(task.id)}  />
      </label>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
      <div>
        <FaEdit className='icon' onClick={() => editTodo(task.id)} />
        <MdDeleteSweep onClick={() => deleteTodo(task.id)} />

      </div>
    </div>
  )
}

export default Todo
