import React, { useState } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
    console.log(todos);
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = id => {
    if (window.confirm("タスクを削除しますか？")) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  // 与えられた ID に一致する Todo アイテムがあれば、そのアイテムの isEditing プロパティを反転させた新しいオブジェクトを作成し、それ以外のアイテムは変更せずにそのまま新しい配列に含まれます。
  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) => (
        todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo
      ))
    )
  }

  // filter() は Array インスタンスのメソッドで、指定された配列の中から指定された関数で実装されているテストに合格した要素だけを抽出したシャローコピーを作成します。
  // 今回のfilter関数はfalseになるものだけを残していく。trueがチェック済み(todo.completed)　false(!todo.completed)
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

