import { useState, useRef } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  // これから追加していくタスクを意味している。タスクとはオブジェクト(name, id, completedというフィールドを用意しているもの全体をオブジェクトという)。変数としてtodos(オブジェクト)を用意する。この変数を監視、管理するのがuseState。変数todosの値が更新されるとページをリロードしてページを更新してくれる。無駄なレンダリングを防ぐ役割。
  // setTodosはtodosの中身を更新したり追加したりする役割
  const [todos, setTodos] = useState([
    {id: 1, name: "todo1", completed: false },
    {id: 2, name: "todo2", completed: true },
  ]);

  const todoNameRef = useRef();
  //inputの中にref={todoNameRef}を入れる
  //useRefは簡単に要素を取得できる。console.log(todoNameRef.current.value);でinputに打ち込んだ文字列を取得できる。


  const handleAddTask = () => {
    // タスクを追加する。その前にまず文字列を取得しなければならない。
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    // setTodosで何かしら値を入れることでtodosが更新される　previousTodos(前のタスク)
    setTodos((previousTodos) => {
      return [...previousTodos, { id: "1", name: name, completed: false }];
    })
    // 入力がし終わったら入力欄を空にする
    todoNameRef.current.value = null;

  }

  return (
    <>
      {/* todosという名前で{todos}(変数)をpropsとしてTodoListに渡すことができる。値はTodoListで受け取る。 */}
      <TodoList todos={todos} />
      <input type="text" ref={todoNameRef} />
      {/* 追加するにはbuttonタグにonClickを足す */}
      <button onClick={handleAddTask}>タスクを追加</button>
      <button>完了したタスクを削除</button>
      <div>
        残りのタスク:0
      </div>
    </>
  );
}

export default App;
