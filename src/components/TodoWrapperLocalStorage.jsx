import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // ローカルストレージから'todos'というキーで保存されたデータを取得
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    // 取得したデータをコンポーネントの状態にセットする
    setTodos(savedTodos);
  }, [])

  const addTodo = todo => {
      const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const toggleComplete = id => {
      const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const deleteTodo = id => {
    if (window.confirm("タスクを削除しますか？")) {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  }

  // 与えられた ID に一致する Todo アイテムがあれば、そのアイテムの isEditing プロパティを反転させた新しいオブジェクトを作成し、それ以外のアイテムは変更せずにそのまま新しい配列に含まれます。
  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
    const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const unfinishedTodosCount = todos.filter((todo) => !todo.completed).length;
  const allTodosCount = todos.length;
  const completedTodosCount = allTodosCount - unfinishedTodosCount

  return (
    <div className='TodoWrapper'>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      ))}

      <div className='todo-info'>
        <h3>すべてのタスク : <span>{ allTodosCount }</span></h3>
        <h3>未完了 : <span>{ unfinishedTodosCount }</span></h3>
        <h3>完了のタスク : <span>{ completedTodosCount }</span></h3>
      </div>
    </div>
  )
}

