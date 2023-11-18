import React, { useState } from 'react'

export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
    setValue("");
  }
  return (
    <form className='TodoForm' onSubmit={handleSubmit} >
      <input type="text" value={value} className='todo-input' placeholder='更新したい文章を入力' onChange={(e) => setValue(e.target.value)} />
      <button type='submit' className='todo-btn' >タスクを更新</button>
    </form>
  )
}

