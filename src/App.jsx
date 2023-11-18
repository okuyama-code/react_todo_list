import './App.scss';
import { TodoWrapperLocalStorage } from './components/TodoWrapperLocalStorage';
// import { TodoWrapper } from './components/TodoWrapper';

function App() {
  return (
    <div className="App">
      {/* <TodoWrapper /> */}
      <TodoWrapperLocalStorage />
    </div>
  );
}

export default App;
