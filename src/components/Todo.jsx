import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


const Todo = ({ task, toggleComplete, deleteTodo }) => {
  return (
    <div className='Todo'>
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p>
      <div>
        <FaEdit className='icon' />
        <MdDeleteSweep onClick={() => deleteTodo(task.id)} />

      </div>
    </div>
  )
}

export default Todo
