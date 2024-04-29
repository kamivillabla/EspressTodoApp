// App.jsx
import React, { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import { Todos } from './components/Todos';
import useTodos from './hooks/useTodos';

const App = () => {
  const { todos, addTodo, removeTodo, updateTodo, toggleCompletion, getTodos } =
    useTodos();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className='container'>
      <h1 className='my-5'>Todos</h1>
      <TodoForm addTodo={addTodo} />
      <Todos
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
};

export default App;
