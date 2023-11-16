import { useState, useRef } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';


function App() {
  // これから追加していくタスクを意味している。タスクとはオブジェクト(name, id, completedというフィールドを用意しているもの全体をオブジェクトという)。変数としてtodos(オブジェクト)を用意する。この変数を監視、管理するのがuseState。変数todosの値が更新されるとページをリロードしてページを更新してくれる。無駄なレンダリングを防ぐ役割。
  // setTodosはtodosの中身を更新したり追加したりする役割
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();
  //inputの中にref={todoNameRef}を入れる
  //useRefは簡単に要素を取得できる。console.log(todoNameRef.current.value);でinputに打ち込んだ文字列を取得できる。


  const handleAddTask = () => {
    // タスクを追加する。その前にまず文字列を取得しなければならない。
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    // setTodosで何かしら値を入れることでtodosが更新される　previousTodos(前のタスク)
    const uuid = uuidv4();
    // console.log(uuid);
    if (name === "") return;
    setTodos((previousTodos) => {
      return [...previousTodos, { id: uuid, name: name, completed: false }];
    })
    // 入力がし終わったら入力欄を空にする
    todoNameRef.current.value = null;
  }

  // completedを反転させる関数。引数のidはどのタスクを完了させるのかのどのの部分を見つけるため。最後にpropsでTodoListに渡す。そしてバケツリレーでTodoコンポーネントにも渡す。
  const toggleTodo = (id) => {
    // todosの中身をまず変数newTodosにコピーする。なぜ？　→　状態変数のtodosを直接触るのは良くないから(ミュータブル、イミュータブル関連)。バグを生まないため。
    const newTodos = [...todos];
    // find() は Array インスタンスのメソッドで、提供されたテスト関数を満たす配列内の最初の要素を返します。
    // idは引数に与えられたもの
    const todo = newTodos.find((todo) => todo.id === id);
    // 一致したならば見つけたtodoのcompletedの状態を反転させる。
    todo.completed = !todo.completed; //ここではまだ更新していない
    setTodos(newTodos); //ここでコピーした配列の変更点を新しい状態として更新する。
  }

  const handleClear = () => {
    // 完了していないタスク(completedがfalseのものだけ残して配列を更新する)
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      {/* todosという名前で{todos}(変数)をpropsとしてTodoListに渡すことができる。値はTodoListで受け取る。 */}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      {/* 追加するにはbuttonタグにonClickを足す */}
      <button onClick={handleAddTask}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクを削除</button>
      <div>
        {/* filter() は Array インスタンスのメソッドで、指定された配列の中から指定された関数で実装されているテストに合格した要素だけを抽出したシャローコピーを作成します。 */}
        {/* 今回のfilter関数はfalseになるものだけを残していく。trueがチェック済み(todo.completed)
        false(!todo.completed) */}
        残りのタスク:{ todos.filter((todo) => !todo.completed).length }
      </div>
    </>
  );
}

export default App;
