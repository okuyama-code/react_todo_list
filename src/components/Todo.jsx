import React from 'react'

// 受け取ったtoggleTodoはいつ呼べばいいのかが重要点→チェックボックスをクリックしたとき。→ onchange
const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    // このコンポーネントは作成されたTodoList(配列)の一つ一つすべて。自分のidを引数に入れる
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.completed} readOnly onChange={handleTodoClick} />
      </label>
      {todo.name}
    </div>
  )
}

export default Todo
